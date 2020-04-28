export default class TextNode {
  constructor(node, offset) {
    this.node = node;
    this.offset = offset;
  }
  static getSelectText(startNode, endNode, startIndex, endIndex) {
    //  再看看这里怎么回事= =
    let text = "";
    if (
      startNode.childNodes.length &&
      startNode.nodeName !== "SCRIPT" &&
      startNode.nodeName !== "STYLE"
    ) {
      const childNode = startNode.childNodes[0];
      const textChild = this.getSelectText(childNode, endNode, 0, endIndex);
      text += textChild;
      return text;
    }
    if (startNode.nodeName === "#text") {
      const textEndIndex =
        startNode === endNode ? endIndex : startNode.textContent.length;
      text += startNode.textContent.substring(startIndex, textEndIndex);
    }
    if (startNode === endNode) {
      return text;
    }
    const nextNode = startNode.nextSibling;
    if (nextNode) {
      const nextText = this.getSelectText(nextNode, endNode, 0, endIndex);
      text += nextText;
    } else {
      let currentNode = startNode.parentNode;
      while (currentNode && currentNode.nextSibling === null) {
        currentNode = currentNode.parentNode;
      }
      if (currentNode) {
        const siblingText = this.getSelectText(
          currentNode.nextSibling,
          endNode,
          0,
          endIndex
        );
        text += siblingText;
      } else {
        throw new Error("Invalid end node");
      }
    }
    return text;
  }
}
