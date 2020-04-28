export default class Rect {
  constructor(container) {
    this.container = container;
    this.elements = [];
  }

  setRects = (rects, offsetY) => {
    this.reset();
    let rectArray;
    if (Array.isArray(rects)) {
      rectArray = rects;
    } else {
      rectArray = [rects];
    }
    var ElArray = document.createDocumentFragment();
    this.elements = rectArray.map(rect => {
      const rectEl = document.createElement('div');
      rectEl.style.width = `${rect.width}px`;
      rectEl.style.height = `${rect.height}px`;
      rectEl.style.backgroundColor = 'rgba(23,136,189,0.35)';
      rectEl.style.position = 'absolute';
      rectEl.style.left = `${rect.left}px`;
      rectEl.style.top = `${rect.top - offsetY}px`;
      ElArray.appendChild(rectEl);
      return rectEl;
    });
    this.container.appendChild(ElArray);
  };
  reset = () => {
    this.elements.forEach(el => this.container.removeChild(el));
    this.elements = [];
  };
  getSelectRects(startNode, endNode, startIndex, endIndex) {
    //  再看看这里怎么回事= =
    const rects = [];
    if (
      startNode.childNodes.length &&
      startNode.nodeName !== 'SCRIPT' &&
      startNode.nodeName !== 'STYLE'
    ) {
      const childNode = startNode.childNodes[0];
      const rectsChild = this.getSelectRects(childNode, endNode, 0, endIndex);
      rects.push(...rectsChild);
      return rects;
    }
    if (startNode.nodeName === '#text') {
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
        throw new Error('Invalid end node');
      }
    }
    return rects;
  }
}
