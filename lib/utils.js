export function getEventPath(evt) {
  return evt.path || (evt.composedPath && evt.composedPath()) || "";
}
export function getSingleRect(node, startIndex, endIndex) {
  const range = document.createRange();
  range.setStart(node, startIndex);
  range.setEnd(node, endIndex);
  const textRects = range.getClientRects();
  if (textRects.length) {
    return textRects[0];
  } else {
    return null;
  }
}
export function getNextRectByCurrentNode(node, container) {
  let nextRect = null;
  const nextTextNode = getNextTextNode(node, container);
  if (nextTextNode) {
    nextRect = getSingleRect(nextTextNode, 0, 1);
  }
  return nextRect;
}
function getNextTextNode(node, container) {
  const nextTextNode = getNextTextNodeOrContainer(node, container);
  if (nextTextNode && nextTextNode !== container) {
    return nextTextNode;
  }
  return null;
}
function getNextTextNodeOrContainer(node, container) {
  let nextTextNode = null;
  if (
    node.classList &&
    node.classList.contains("mobile-text-selection-tools")
  ) {
    return null;
  }

  if (node.childNodes.length) {
    const firstChildNode = node.childNodes[0];
    if (
      firstChildNode.nodeName === "#text" &&
      !/^\s+$/.test(firstChildNode.textContent)
    ) {
      nextTextNode = firstChildNode;
    } else {
      nextTextNode = getNextTextNodeOrContainer(firstChildNode, container);
    }
  }
  if (nextTextNode) return nextTextNode;
  let nextNode = node.nextSibling;
  while (!nextTextNode && nextNode) {
    if (nextNode.nodeName === "#text" && !/^\s+$/.test(nextNode.textContent)) {
      nextTextNode = nextNode;
    } else {
      nextTextNode = getNextTextNodeOrContainer(nextNode, container);
    }
    if (!nextTextNode) nextNode = nextNode.nextSibling;
  }
  if (nextTextNode) return nextTextNode;

  let parentNode = node.parentNode;
  let parentNextNode;
  while (!parentNextNode && parentNode !== container) {
    parentNextNode = parentNode.nextSibling;
    parentNode = parentNode.parentNode;
  }
  while (!nextTextNode && parentNextNode) {
    if (
      parentNextNode.nodeName === "#text" &&
      !/^\s+$/.test(parentNextNode.textContent)
    ) {
      nextTextNode = parentNextNode;
    } else {
      nextTextNode = getNextTextNodeOrContainer(parentNextNode, container);
      if (!nextTextNode) parentNextNode = parentNextNode.nextSibling;
    }
  }
  if (nextTextNode) return nextTextNode;
  if (parentNode === container) {
    return container;
  }
  return nextTextNode;
}
