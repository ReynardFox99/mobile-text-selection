### `mobile-text-selection` 介绍

移动端 h5 长按选择文本的工具， 屏蔽了安卓和 ios 系统选中文本后的弹窗。

返回选中的文本、起始点和终点的坐标

mobile terminal custom text selection, compatible width ios and android. long press pop-up window provided by the system are forbidden.

### 安装

```
npm i mobile-text-selection
```

### 使用

```js
import TextSelection from "mobile-text-selection";

// 自定义游标(右侧)
const customCursorDom = document.createElement("div");
customCursorDom.style.backgroundColor = "#1788bd";
customCursorDom.style.borderRadius = "0 50% 50% 50%";
customCursorDom.style.width = "50px";
customCursorDom.style.height = "50px";

const textWrapper = document.getElementById("textWrapper");
const textSelection = new TextSelection({
  container: textWrapper, // 容器 必须要传哦
  cursorDom: customDom, // 自定义游标dom 只传右侧就可以 不传就是默认游标 如果传了 那么下面cursorColor就失效了
  cursorColor: "#1788bd", // 左右指针颜色 可以不传  "red" || "#333333" || "rgba(125,125,125)"
  rectsColor: "rgba(23,136,189,0.35)", // 选中文字的颜色 可以不传  "#333333aa" || "rgba(125,125,125, 0.5)" 需要是个透明色哦
  longTapDuration: 400, // 长按的时间 默认是600
  magnifierWidth: 100, // 放大镜宽度 默认100px
  magnifierHeight: 50, // 放大镜高度 默认50px
  magnifierOffset: 50, // 放大镜向上偏移的距离 默认50px
  magnifierBackgroundColor: '#fff', // 放大镜背景色，理论上应设为文字背景色 默认白色（该配置项从 v0.1.2 起生效）
  selectCb: () => {}, // 从1.3开始替换为onStart了  参数跟onStart一样
  finishCb: () => {}, // 从1.3开始替换为onFinish了  参数跟onFinish一样
  onStart: () => {}, // 开始选择的回调 可以不传
  onCancel: () => {}, // 失焦的回调 可以不传
  onFinish: ({
    text, // 选中的文字
    startX, //  相对于容器 前指针右侧第一个字的左上角的x坐标
    startY, //  相对于容器 前指针右侧第一个字的左上角的y坐标
    endX, //  相对于容器 后指针左侧第一个字的右上角的x坐标
    endY, // 相对于容器 后指针左侧第一个字的右上角的y坐标
  }) => {}, // 选完的回调 也可以不传
  tokenizer: (str) => {
    // 需要分词的文字
    // 需要返回分词起始位置和长度
    return [index, length];
  },
});
// 初始化
textSelection.init();
```

### Demo

[demo (codesandbox)](https://codesandbox.io/s/mobile-text-selection-example-zc9k3?file=/src/App.js)

![alt demo (gif)](https://github.com/ReynardFox99/mobile-text-selection/blob/master/demo.gif "demo (gif)")

### 第一次学着写 npm 包（紧张

参考了[easy-marker](https://github.com/luojilab/easy-marker.git)

用 npm run b 的话可以创建浏览器

### 更新记录

v0.1.0:

- 增加了放大镜功能 创建时候增加了放大镜的配置项
- 增加了游标交换的功能
- 修复了每行选不到最后一个字的问题..

v0.1.1

- 修复了放在 iframe 里游标不移动的情况
- 修复了多次在同一个容器上创建 TextSelection 时候的叠加问题...
- 阻止事件冒泡

v0.1.3

- 增加 magnifierBackgroundColor 配置项

v0.1.4

- 修复了container有margin的时候 放大镜内容错位的问题

v0.2.0
- 游标自定义
- 支持长按选中时调用端分词
- 修改了回调函数名字

### 待办

- 如果容器有滚动条的话 出大问题额..
- 游标之后可能还需要上下对称的 和字并排 像华为的浏览器里那样
