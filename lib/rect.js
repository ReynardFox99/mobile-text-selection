export default class Rect {
  constructor({ container, rectsColor = "rgba(23,136,189,0.35)" }) {
    this.container = container;
    this.rectsColor = rectsColor;
    this.elements = [];
  }

  setRects = (rects, offsetX, offsetY) => {
    this.reset();
    let rectArray;
    if (Array.isArray(rects)) {
      rectArray = rects;
    } else {
      rectArray = [rects];
    }
    var elArray = document.createDocumentFragment();
    this.elements = rectArray.map((rect) => {
      const rectEl = document.createElement("div");
      rectEl.classList.add(
        "mobile-text-selection-tools",
        "mobile-text-selection-tools-rect"
      );
      rectEl.style.pointerEvents = "none";
      rectEl.style.width = `${rect.width}px`;
      rectEl.style.height = `${rect.height}px`;
      rectEl.style.backgroundColor = this.rectsColor;
      rectEl.style.position = "absolute";
      rectEl.style.left = `${rect.left - offsetX}px`;
      rectEl.style.top = `${rect.top - offsetY}px`;
      elArray.appendChild(rectEl);
      return rectEl;
    });
    this.container.appendChild(elArray);
  };
  reset = () => {
    this.elements
      .slice()
      .reverse()
      .forEach((el) => this.container.removeChild(el));
    this.elements = [];
  };
  getSelectRects(startNode, endNode, startIndex, endIndex) {
    //  再看看这里怎么回事= =
    const rects = [];
    if (
      startNode.childNodes.length &&
      startNode.nodeName !== "SCRIPT" &&
      startNode.nodeName !== "STYLE"
    ) {
      const childNode = startNode.childNodes[0];
      const rectsChild = this.getSelectRects(childNode, endNode, 0, endIndex);
      rects.push(...rectsChild);
      return rects;
    }
    if (startNode.nodeName === "#text") {
      const rectEndIndex =
        startNode === endNode ? endIndex : startNode.textContent.length;
      const range = document.createRange();
      range.setStart(startNode, startIndex);
      range.setEnd(startNode, rectEndIndex);
      rects.push(...range.getClientRects());
    }
    if (startNode === endNode) {
      return rects;
    }
    const nextNode = startNode.nextSibling;
    if (nextNode) {
      const nextRects = this.getSelectRects(nextNode, endNode, 0, endIndex);
      rects.push(...nextRects);
    } else {
      let currentNode = startNode.parentNode;
      if (currentNode === this.container) {
        return [];
      }
      while (
        currentNode &&
        (currentNode.nextSibling === null || currentNode === this.container)
      ) {
        currentNode = currentNode.parentNode;
      }
      if (currentNode && currentNode === this.container) {
        return [];
      } else if (currentNode) {
        const siblingRects = this.getSelectRects(
          currentNode.nextSibling,
          endNode,
          0,
          endIndex
        );
        rects.push(...siblingRects);
      } else {
        throw new Error("Invalid end node");
      }
    }
    return rects;
  }
}
