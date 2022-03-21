export default class Cursor {
  constructor({ container, cursorDom, type, color = "#1788bd" }) {
    this.container = container;
    this.element = null;
    this.cursorDom = cursorDom;
    this.type = type;
    this._position = { x: 0, y: 0 };
    this.height = 0;
    this.size = 15;
    this.color = color;
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
      this.element.style.left = `${x - this.size * 2}px`;
    } else {
      this.element.style.left = `${x}px`;
    }

    this.element.style.top = `${y + this.height}px`;
  }
  createElement = () => {
    const element = document.createElement("div");
    element.classList.add(
      "mobile-text-selection-tools",
      "mobile-text-selection-tools-cursor",
    );
    element.style.userSelect = "none";
    element.style.webkitUserSelect = "none";
    element.style.display = "none";
    element.style.position = "absolute";
    element.style.left = "0px";
    element.style.top = "0px";
    element.style.zIndex = 2;
    element.style.width = `${this.size * 2}px`;
    if (this.type === "start") {
      element.style.transform = "scaleX(-1)";
    }
    let pointWrapper;
    if (this.cursorDom && this.cursorDom instanceof Element) {
      pointWrapper = this.cursorDom.cloneNode(true);
    } else {
      pointWrapper = document.createElement("div");
      pointWrapper.style.boxSizing = `border-box`;
      pointWrapper.style.width = `${this.size * 2}px`;
      pointWrapper.style.height = `${this.size * 3}px`;
      const topPoint = document.createElement("div");
      topPoint.style.width = "0";
      topPoint.style.height = "0";
      topPoint.style.borderWidth = `${this.size / 2}px`;
      topPoint.style.borderColor = `transparent transparent ${this.color} ${this.color}`;
      topPoint.style.borderStyle = "solid";

      const bottomPoint = document.createElement("div");
      bottomPoint.style.width = `${this.size}px`;
      bottomPoint.style.height = `${this.size}px`;
      bottomPoint.style.backgroundColor = this.color;
      pointWrapper.appendChild(topPoint);
      pointWrapper.appendChild(bottomPoint);
    }
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
