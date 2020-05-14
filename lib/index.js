import TextNode from "./textNode";
import Rect from "./rect";
import Cursor from "./cursor";
import Magnifier from "./magnifier";
import { getEventPath, getSingleRect, getNextRectByCurrentNode } from "./utils";

export default class TextSelect {
  constructor({
    container,
    cursorColor,
    rectsColor,
    magnifierHeight,
    magnifierWidth,
    magnifierOffset,
    longTapDuration = 600,
    finishCb = () => {},
    selectCb = () => {},
  }) {
    if (!container) throw Error("TextSelection 容器不能为空");
    this.container = container;
    this.longTapTimer = null;
    this.longTapDuration = longTapDuration;
    this.touchStartPosition = { x: 0, y: 0 };
    this.touchStartTime = null;
    this.touchMoveDuration = 0;
    this.cursorColor = cursorColor;
    this.cursor = {
      start: null,
      end: null,
    };
    this.textNode = {
      start: null,
      end: null,
    };
    this.movingCursor = null;
    this.mask = null;
    this.selectStatus = "none"; // selecting finished
    // 回调
    this.finishCb = finishCb;
    this.selectCb = selectCb;
    // 选中标记
    this.rects = null;
    this.rectsColor = rectsColor;
    // 放大镜
    this.magnifier = null;
    this.magnifierHeight = magnifierHeight;
    this.magnifierWidth = magnifierWidth;
    this.magnifierOffset = magnifierOffset;
  }
  get screenRelativeOffset() {
    // 获取container距离顶部的举例 因为页面可以滚动嘛 用于所有的y坐标计算
    const { top, left } = this.container.getBoundingClientRect();
    return {
      x: left,
      y: top,
    };
  }
  blur = () => {
    // 失焦时候隐藏所有指针和底色
    this.cursor.start.hide();
    this.cursor.end.hide();
    this.rects.reset();
    this.selectStatus = "none";
    this.magnifier.hide();
  };
  init = () => {
    // 初始化
    this.container.oncontextmenu = (e) => {
      e.preventDefault();
      return;
    };
    this.container.style.userSelect = "none";
    this.container.style.webkitUserSelect = "none";
    this.container.style.webkitTouchCallout = "none";
    this.magnifier = new Magnifier({
      container: this.container,
      color: this.rectsColor,
      height: this.magnifierHeight,
      width: this.magnifierWidth,
      offset: this.magnifierOffset,
    });
    this.container.addEventListener("touchstart", this.handleTouchStart);
    this.container.addEventListener("touchmove", this.handleTouchMove);
    this.container.addEventListener("touchend", this.handleTouchEnd);
    this.container.style.position = "relative";
    this.cursor.start = new Cursor({
      container: this.container,
      type: "start",
      color: this.cursorColor,
    });
    this.cursor.end = new Cursor({
      container: this.container,
      type: "end",
      color: this.cursorColor,
    });
    this.rects = new Rect({
      container: this.container,
      rectsColor: this.rectsColor,
    });
  };
  handleTouchStart = (e) => {
    // 触摸位置
    const touchPoint = e.changedTouches[0];
    const mouseX = touchPoint.clientX;
    const mouseY = touchPoint.clientY;
    // 触摸时间 用于结束时候的计算
    this.touchStartTime = Date.now();
    // 触摸位置 用于结束时候的计算
    this.touchStartPosition = { x: mouseX, y: mouseY };
    // 是否正在触摸左右cursor
    const touchStartCursor =
      getEventPath(e).indexOf(this.cursor.start.element) > -1;
    const touchEndCursor =
      getEventPath(e).indexOf(this.cursor.end.element) > -1;
    if (touchStartCursor) {
      // 记录正在移动的cursor 用于之后的cursor位置交换判断
      this.movingCursor = this.cursor.start;
      // 状态设置成正在选择文字 用于禁止页面滚动
      this.selectStatus = "selecting";
    } else if (touchEndCursor) {
      this.movingCursor = this.cursor.end;
      this.selectStatus = "selecting";
    } else {
      // 不是的话就延时检查是不是长按事件
      const event = e;
      this.longTapTimer = setTimeout(() => {
        // 是长按选择事件
        // 开始选择文字的回调
        this.selectCb();
        // 处理长按选择事件
        if (event.target) {
          this.magnifier.show();
          this.handleLongTap(event.target, mouseX, mouseY);
        }
        this.selectStatus = "selecting";
      }, this.longTapDuration);
    }
  };
  handleTouchMove = (e) => {
    // 如果正在选择文字 则禁止滚动
    if (this.selectStatus === "selecting") {
      e.preventDefault();
      const event = e;
      const touchPoint = event.changedTouches[0];
      // 限制移动范围
      let mouseX = touchPoint.clientX;
      let mouseY = touchPoint.clientY;
      const containerBound = this.container.getBoundingClientRect();
      if (mouseY < containerBound.top) {
        mouseY = containerBound.top;
      }
      if (mouseY > containerBound.bottom) {
        mouseY = containerBound.bottom;
      }
      if (mouseX < containerBound.left) {
        mouseX = containerBound.left;
      }
      if (mouseX > containerBound.right) {
        mouseX = containerBound.right;
      }
      // 如果正在移动cursor 延时检查是不是拖动选择事件
      if (this.movingCursor) {
        // 是拖动选择事件
        // 开始选择文字的回调
        this.selectCb();
        // 移动后的位置

        // 隐藏正在移动的cursor 才能获取坐标位置的文本元素 不然e.target就是cursor拉
        this.movingCursor.hide();
        // 获取目标 这里有一个问题就是我使用坐标的时候 一开始按住的是cursor的坐标 但是后来移动的时候 触摸的位置不再是cursor的坐标了 影响不大
        const target = document.elementFromPoint(mouseX, mouseY);
        this.cursor.start.show();
        this.cursor.end.show();
        // 处理拖动cursor事件
        if (target) {
          this.magnifier.show();
          this.moveCursor(target, mouseX, mouseY);
        }
      } else if (this.rects) {
        const target = document.elementFromPoint(mouseX, mouseY);
        if (target) {
          this.magnifier.show();
          this.handleLongTap(target, mouseX, mouseY);
        }
        // 长按以后的移动
      }
    }
    clearTimeout(this.longTapTimer);
    this.longTapTimer = null;
  };
  handleTouchEnd = (e) => {
    // 触摸结束 定时器都清空
    clearTimeout(this.longTapTimer);
    this.longTapTimer = null;
    // 状态清空
    this.movingCursor = null;
    this.magnifier.hide();
    const touchPoint = e.changedTouches[0];
    if (
      Date.now() - this.touchStartTime < this.longTapDuration &&
      touchPoint.clientX === this.touchStartPosition.x &&
      touchPoint.clientY === this.touchStartPosition.y
    ) {
      // 当触碰结束时 如果不是移动事件的结束 也不是长按事件的结束 就当作普通点击处理
      this.blur();
    } else {
      // 如果是长按或者移动事件结束 判断有没有选区
      // 有选取的话就弹窗 没选区就啥也不干 有时候有选区但是没选到字呢..
       // 获取选择的文本
       const text = this.getText();
      if (this.rects.elements.length && text) {
       
        // 选择完成后的回调
        this.finishCb({
          text,
          startX: this.cursor.start.position.x,
          startY: this.cursor.start.position.y,
          endX: this.cursor.end.position.x,
          endY: this.cursor.end.position.y,
        });
        // 状态设置成已完成选择
        this.selectStatus = "finished";
      }
    }
  };
  getText = () => {
    // 获取选择的文标
    // textNode 是在坐标移动时候计算的
    if (!this.textNode.start || !this.textNode.end) return;
    const text = TextNode.getSelectText(
      this.textNode.start.node,
      this.textNode.end.node,
      this.textNode.start.offset,
      this.textNode.end.offset
    );
    return text;
  };
  moveCursor = (element, x, y) => {
    // 移动cursor事件 用于计算cursor的正确位置并显示
    // 计算移动到的[文字]的坐标信息和并保存文字节点信息
    if (!element || /^\s+$/.test(element)) return;
    const { x: moveX, y: moveY, node, index, height } =
      this.getMoveOrTapRectPosition(element, x, y) || {};
    // 计算cursor需不需要交换
    const currentX = moveX - this.screenRelativeOffset.x;
    const currentY = moveY - this.screenRelativeOffset.y;
    // 如果没找到node 或者坐标是无效值(比如element是另一个cursor..) 就不再执行了
    if (!node || (!currentX && !currentY)) return;
    const unmovingCursor =
      this.movingCursor === this.cursor.start
        ? this.cursor.end
        : this.cursor.start;
    // 如果左右cursor一个位置 就都隐藏掉拉
    if (
      unmovingCursor.position.x === currentX &&
      unmovingCursor.position.y === currentY
    ) {
      this.cursor.start.hide();
      this.cursor.end.hide();
      this.rects.reset();
      return;
    }
    if (this.movingCursor === this.cursor.start) {
      //   正在移动start
      const endPosition = this.cursor.end.position;
      if (
        currentY < endPosition.y - height / 2 ||
        (currentY === endPosition.y && currentX < endPosition.x)
      ) {
        // 不需要交换
        this.textNode.start = new TextNode(node, index);
      } else {
        // 气死 不交换了  防止因为字号大小不同 导致计算出y值不同而不能正确交换引起的交换错误
        // 需要交换
        // this.cursor.start.position = this.cursor.end.position;
        // this.movingCursor = this.cursor.end;
        // this.textNode.start = new TextNode(
        //   this.textNode.end.node,
        //   this.textNode.end.offset
        // );
        // this.textNode.end = new TextNode(node, index);
        return;
      }
    } else {
      //   正在移动end
      const startPosition = this.cursor.start.position;
      if (
        currentY > startPosition.y + height / 2 ||
        (currentY === startPosition.y && currentX > startPosition.x)
      ) {
        // 不需要交换
        this.textNode.end = new TextNode(node, index);
      } else {
        // 需要交换
        // this.cursor.end.position = this.cursor.start.position;
        // this.movingCursor = this.cursor.start;
        // this.textNode.end = new TextNode(
        //   this.textNode.start.node,
        //   this.textNode.start.offset
        // );
        // this.textNode.start = new TextNode(node, index);
        return;
      }
    }
    // 设置新的坐标位置 在长按的时候就已经显示cursor拉 所以不需要再显示啦
    this.movingCursor.position = {
      x: moveX - this.screenRelativeOffset.x,
      y: moveY - this.screenRelativeOffset.y,
    };
    this.magnifier.position = {
      x: moveX - this.screenRelativeOffset.x,
      y: moveY - this.screenRelativeOffset.y,
    };
    // 计算阴影
    const rects = this.rects.getSelectRects(
      this.textNode.start.node,
      this.textNode.end.node,
      this.textNode.start.offset,
      this.textNode.end.offset
    );
    if (rects.length) {
      // 显示阴影
      this.rects.setRects(
        rects,
        this.screenRelativeOffset.x,
        this.screenRelativeOffset.y
      );
      // TODO 放大镜的rect
      this.magnifier.rects.setRects(
        rects,
        this.screenRelativeOffset.x,
        this.screenRelativeOffset.y
      );
    }
  };

  // 先触发长按 之后才触发移动
  handleLongTap = (element, x, y) => {
    // 长按事件
    this.magnifier.position = {
      x: x - this.screenRelativeOffset.x,
      y: y - this.screenRelativeOffset.y,
    };

    // 计算被长按的[文字]的坐标信息和并保存文字节点信息
    const { node, rect, index, height } =
      this.getMoveOrTapRectPosition(element, x, y) || {};

    if (!rect || (rect && rect.length === 0)) return;
    this.textNode.start = new TextNode(node, index);
    this.textNode.end = new TextNode(node, index + 1);
    // 设置cursor位置
    this.cursor.start.height = height;
    this.cursor.end.height = height;
    this.cursor.start.position = {
      x: rect.x - this.screenRelativeOffset.x,
      y: rect.y - this.screenRelativeOffset.y,
    };
    this.cursor.end.position = {
      x: rect.x + rect.width - this.screenRelativeOffset.x,
      y: rect.y - this.screenRelativeOffset.y,
    };
    // 显示cursor 后面移动的时候不需要再显示了
    this.cursor.start.show();
    this.cursor.end.show();
    // 长按就一个字 不需要再计算阴影位置了 直接显示阴影
    this.rects.setRects(
      rect,
      this.screenRelativeOffset.x,
      this.screenRelativeOffset.y
    );
    // TODO 放大镜的rect
    this.magnifier.rects.setRects(
      rect,
      this.screenRelativeOffset.x,
      this.screenRelativeOffset.y
    );
  };

  getMoveOrTapRectPosition = (element, x, y) => {
    // 计算移动或长按位置的[文字]坐标和节点信息
    if (!this.container.contains(element)) {
      // 如果移动到container外面就不计算了
      return null;
    }
    if (
      element.nodeName === "#comment" ||
      element.classList.contains("mobile-text-selection-tools")
    ) {
      return null;
    }
    if (!element || (element && !element.childNodes)) return null;
    // 计算行高 用于判断y坐标
    let lineHeight = Number(
      window.getComputedStyle(element).lineHeight.replace("px", "")
    );
    for (let i = 0; i < element.childNodes.length; i++) {
      const node = element.childNodes[i];
      // 如果是文本节点
      if (node.nodeName === "#text") {
        const content = node.textContent;
        window.getSelection().removeAllRanges();
        // 遍历节点文本内容
        for (let j = 0; j < content.length; j++) {
          // content[j] 是一个字
          // 用range对象计算这个字的位置信息
          const rect = getSingleRect(node, j, j + 1);
          if (!rect) continue;
          lineHeight = lineHeight || rect.height;
          const margin = lineHeight / 2;
          if (
            rect.left < x &&
            // rect.right > x &&
            rect.top - margin < y &&
            rect.bottom + margin > y
          ) {
            let nextRect = null;
            if (j === content.length - 1) {
              // 是当前标签最后一个字 检查下一个标签的第一个字
              nextRect = getNextRectByCurrentNode(node, this.container);
            } else {
              // 当前标签后面还有字
              nextRect = getSingleRect(node, j + 1, j + 2);
            }
            
            if (rect.right > x) {
              return {
                x: rect.left,
                y: rect.top,
                node,
                index: j,
                height: rect.height,
                width: rect.width,
                rect,
              };
            }
            
            const isLineEnd =
              !nextRect || (nextRect && nextRect.right < rect.left);
            if (isLineEnd) {
              return {
                x: rect.right,
                y: rect.top,
                node,
                index: j + 1,
                height: rect.height,
                width: rect.width,
                rect,
              };
            }
          }
        }
      } else if (
        node.nodeName === "#comment" ||
        node.classList.contains("mobile-text-selection-tools")
      ) {
        // 如果是contianer里的selection相关组件 也不计算
        continue;
      } else {
        const result = this.getMoveOrTapRectPosition(node, x, y);
        if (result) return result;
      }
    }
    return null;
  };
}
