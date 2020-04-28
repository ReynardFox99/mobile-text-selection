import TextNode from "./textNode";
import Rect from "./rect";
import Cursor from "./cursor";
import { getEventPath } from "./utils";

export default class TextSelect {
  constructor(container, { finishCb = () => {}, selectCb = () => {} }) {
    this.container = container;
    this.longTapTimer = null;
    this.longTapDuration = 400;
    this.touchStartPosition = { x: 0, y: 0 };
    this.touchStartTime = null;
    this.touchMoveTimer = null;
    this.touchMoveDuration = 0;
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
    this.finishCb = finishCb;
    this.selectCb = selectCb;
    this.rects = null;
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
    this.container.addEventListener("touchstart", this.handleTouchStart);
    this.container.addEventListener("touchmove", this.handleTouchMove);
    this.container.addEventListener("touchend", this.handleTouchEnd);
    this.container.style.position = "relative";
    this.cursor.start = new Cursor(this.container, "start");
    this.cursor.end = new Cursor(this.container, "end");
    this.rects = new Rect(this.container);
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
          this.handleLongTap(event.target, mouseX, mouseY);
        }
      }, this.longTapDuration);
    }
  };
  handleTouchMove = (e) => {
    // 如果正在选择文字 则禁止滚动
    if (this.selectStatus === "selecting") {
      e.preventDefault();
    }
    const event = e;
    // 如果正在移动cursor 延时检查是不是拖动选择事件
    if (this.movingCursor) {
      clearTimeout(this.touchMoveTimer);
      this.touchMoveTimer = setTimeout(() => {
        // 是拖动选择事件
        // 开始选择文字的回调
        this.selectCb();
        // 移动后的位置
        const touchPoint = event.changedTouches[0];
        // 限制移动范围
        const mouseX = touchPoint.clientX;
        let mouseY = touchPoint.clientY;
        const containerTop = this.container.getBoundingClientRect().top;
        const containerBottom = this.container.getBoundingClientRect().bottom;
        if (mouseY < containerTop) {
          mouseY = containerTop;
        }
        if (mouseY > containerBottom) {
          mouseY = containerBottom;
        }
        // 隐藏正在移动的cursor 才能获取坐标位置的文本元素 不然e.target就是cursor拉
        this.movingCursor.hide();
        // 获取目标 这里有一个问题就是我使用坐标的时候 一开始按住的是cursor的坐标 但是后来移动的时候 触摸的位置不再是cursor的坐标了 影响不大
        const target = document.elementFromPoint(mouseX, mouseY);
        this.cursor.start.show();
        this.cursor.end.show();
        // 处理拖动cursor事件
        if (target) {
          this.moveCursor(target, mouseX, mouseY);
        }
      }, this.touchMoveDuration);
    }
    // 不是移动cursor 不处理
    clearTimeout(this.longTapTimer);
    this.longTapTimer = null;
  };
  handleTouchEnd = (e) => {
    // 触摸结束 定时器都清空
    clearTimeout(this.longTapTimer);
    this.longTapTimer = null;
    clearTimeout(this.touchMoveTimer);
    this.touchMoveTimer = null;
    // 状态清空
    this.movingCursor = null;
    const touchPoint = e.changedTouches[0];
    if (
      Date.now() - this.touchStartTime < this.longTapDuration &&
      touchPoint.clientX === this.touchStartPosition.x &&
      touchPoint.clientY === this.touchStartPosition.y
    ) {
      // 当触碰结束时 如果不是移动事件的结束 也不是长按事件的结束 就当作普通点击处理
      this.cursor.start.hide();
      this.cursor.end.hide();
      this.selectStatus = "none";
    } else {
      // 如果是长按或者移动事件结束 判断有没有选区
      // 有选取的话就弹窗 没选区就啥也不干
      if (this.rects.elements.length) {
        // 获取选择的文标
        const text = this.getText();
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
    const { x: moveX, y: moveY, node, index, height } =
      this.getMoveOrTapRectPosition(element, x, y) || {};
    // 计算cursor需不需要交换
    const currentX = moveX;
    const currentY = moveY - this.screenRelativeOffset.y;
    if (!node) return;
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
      x: moveX,
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
      this.rects.setRects(rects, this.screenRelativeOffset.y);
    }
  };

  // 先触发长按 之后才触发移动
  handleLongTap = (element, x, y) => {
    // 长按事件
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
      x: rect.x,
      y: rect.y - this.screenRelativeOffset.y,
    };
    this.cursor.end.position = {
      x: rect.x + rect.width,
      y: rect.y - this.screenRelativeOffset.y,
    };
    // 显示cursor 后面移动的时候不需要再显示了
    this.cursor.start.show();
    this.cursor.end.show();
    // 长按就一个字 不需要再计算阴影位置了 直接显示阴影
    this.rects.setRects(rect, this.screenRelativeOffset.y);
  };

  getMoveOrTapRectPosition = (element, x, y) => {
    // 计算移动或长按位置的[文字]坐标和节点信息
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
        const range = document.createRange();
        // 遍历节点文本内容
        for (let i = 0; i < content.length; i++) {
          // content[i] 是一个字
          // 用range对象计算这个字的位置信息
          range.setStart(node, i);
          range.setEnd(node, i + 1);
          const textRects = range.getClientRects();

          let rect;
          if (textRects.length) {
            rect = textRects[0];
          } else {
            continue;
          }
          const margin = lineHeight / 2;
          if (
            rect.left < x &&
            rect.right > x &&
            rect.top - margin < y &&
            rect.bottom + margin > y
          ) {
            return {
              x: rect.left,
              y: rect.top,
              node,
              index: i,
              height: rect.height,
              width: rect.width,
              rect,
            };
          }
        }
      } else if (node.nodeName === "#comment") {
        continue;
      } else {
        const result = this.getMoveOrTapRectPosition(node, x, y);
        if (result) return result;
      }
    }
  };
}
