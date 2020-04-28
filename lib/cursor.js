export default class Cursor {
  constructor(container, type) {
    this.container = container;
    this.element = null;
    this.type = type;
    this._position = { x: 0, y: 0 };
    this.height = 0;
    this.size = 1;
    this.element = this.createElement();
    container.appendChild(this.element);
  }
  set position({ x, y }) {
    this._position = { x, y };
    this.moveTo(x, y);
  }
  get position() {
    return this._position;
  }
  moveTo(x, y) {
    if (this.type === "start") {
      this.element.style.left = `${x - this.size * 10 - 10}px`; // 第一个10 是1rem = 10px 第二个也是 不过是因为居中放置了箭头出现的偏移量
    } else {
      this.element.style.left = `${x - this.size * 10}px`; // 化简了 x + this.size * 10 - 20 这个20 是2 * this.size * 10
    }
    this.element.style.top = `${y + this.height}px`;
  }
  createElement = () => {
    const element = document.createElement("div");
    element.style.userSelect = "none";
    element.style.webkitUserSelect = "none";
    element.style.display = "none";
    element.style.position = "absolute";
    element.style.left = "0";
    element.style.top = "0";
    element.style.zIndex = 2;
    const pointWrapper = document.createElement("div");
    pointWrapper.style.width = `${this.size * 3}rem`;
    pointWrapper.style.height = `${this.size * 3}rem`;
    pointWrapper.style.display = "flex";
    pointWrapper.style.flexDirection = "column";
    pointWrapper.style.alignItems = "center";
    const topPoint = document.createElement("div");
    topPoint.style.width = "0";
    topPoint.style.height = "0";
    topPoint.style.borderWidth = `${this.size / 2}rem`;
    if (this.type === "start") {
      topPoint.style.borderColor = "transparent #1788bd #1788bd transparent";
    } else {
      topPoint.style.borderColor = "transparent transparent #1788bd  #1788bd ";
    }
    topPoint.style.borderStyle = "solid";

    const bottomPoint = document.createElement("div");
    bottomPoint.style.width = `${this.size}rem`;
    bottomPoint.style.height = `${this.size}rem`;
    bottomPoint.style.backgroundColor = "#1788bd";
    pointWrapper.appendChild(topPoint);
    pointWrapper.appendChild(bottomPoint);
    element.appendChild(pointWrapper);
    return element;
  };
  show = () => {
    this.element.style.display = "block";
  };
  hide = () => {
    this.element.style.display = "none";
  };
}
