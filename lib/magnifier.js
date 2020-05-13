export default class Magnifier {
  constructor({ container }) {
    this.container = container;
    this.height = 50;
    this.width = 100;
    this.offset = 50;
    this._position = { x: 0, y: 0 };
    this.slip = this.createSlip();
    this.clip = this.createClip();

    container.appendChild(this.slip);
    container.appendChild(this.clip);
  }
  set position({ x, y }) {
    this._position = { x, y }; // 触摸的位置 也就是对应的字的位置
    this.moveTo(x, y);
  }
  moveTo = (x, y) => {
    const cWidth = this.container.getBoundingClientRect().width;
    const cHeight = this.container.getBoundingClientRect().height;
    this.slip.style.clipPath = `inset(
        ${y - this.height / 2}px
        ${cWidth - x - this.width / 2}px
        ${cHeight - y - this.height / 2}px
        ${x - this.width / 2}px
    )`;
    this.clip.style.top = `${y - this.offset - this.height / 2}px`;
    this.clip.style.left = `${x - this.width / 2}px`;
  };
  show = () => {
    this.clip.style.display = "block";
    this.slip.style.display = "block";
  };
  hide = () => {
    this.clip.style.display = "none";
    this.slip.style.display = "none";
  };
  createSlip = () => {
    const slip = this.container.cloneNode(true);
    slip.style.pointerEvents = "none";
    slip.style.position = "absolute";
    slip.style.top = `${-this.offset}px`;
    slip.style.left = 0;
    slip.style.backgroundColor = "#fff";
    slip.style.display = "none";
    return slip;
  };
  createClip = () => {
    const clip = document.createElement("div");
    clip.style.pointerEvent = "none";
    clip.style.userSelect = "none";
    clip.style.webkitUserSelect = "none";
    clip.style.position = "absolute";
    clip.style.height = `${this.height}px`;
    clip.style.width = `${this.width}px`;
    clip.style.boxShadow = "0px 1px 2px 1px #666, inset 0px 0px 20px 10px #fff";
    clip.style.borderRadius = "5px";
    clip.style.display = "none";
    return clip;
  };
}
