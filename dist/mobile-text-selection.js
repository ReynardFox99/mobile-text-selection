(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TextSelection = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var Cursor = /*#__PURE__*/function () {
  function Cursor(_ref) {
    var _this = this;

    var container = _ref.container,
        cursorDom = _ref.cursorDom,
        type = _ref.type,
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? "#1788bd" : _ref$color;
    (0, _classCallCheck2.default)(this, Cursor);
    (0, _defineProperty2.default)(this, "createElement", function () {
      var element = document.createElement("div");
      element.classList.add("mobile-text-selection-tools", "mobile-text-selection-tools-cursor");
      element.style.userSelect = "none";
      element.style.webkitUserSelect = "none";
      element.style.display = "none";
      element.style.position = "absolute";
      element.style.left = "0px";
      element.style.top = "0px";
      element.style.zIndex = 2;
      element.style.width = "".concat(_this.size * 2, "px");

      if (_this.type === "start") {
        element.style.transform = "scaleX(-1)";
      }

      var pointWrapper;

      if (_this.cursorDom && _this.cursorDom instanceof Element) {
        pointWrapper = _this.cursorDom.cloneNode(true);
      } else {
        var _context;

        pointWrapper = document.createElement("div");
        pointWrapper.style.boxSizing = "border-box";
        pointWrapper.style.width = "".concat(_this.size * 2, "px");
        pointWrapper.style.height = "".concat(_this.size * 3, "px");
        var topPoint = document.createElement("div");
        topPoint.style.width = "0";
        topPoint.style.height = "0";
        topPoint.style.borderWidth = "".concat(_this.size / 2, "px");
        topPoint.style.borderColor = (0, _concat.default)(_context = "transparent transparent ".concat(_this.color, " ")).call(_context, _this.color);
        topPoint.style.borderStyle = "solid";
        var bottomPoint = document.createElement("div");
        bottomPoint.style.width = "".concat(_this.size, "px");
        bottomPoint.style.height = "".concat(_this.size, "px");
        bottomPoint.style.backgroundColor = _this.color;
        pointWrapper.appendChild(topPoint);
        pointWrapper.appendChild(bottomPoint);
      }

      element.appendChild(pointWrapper);
      return element;
    });
    (0, _defineProperty2.default)(this, "show", function () {
      _this.element.style.display = "block";
    });
    (0, _defineProperty2.default)(this, "hide", function () {
      _this.element.style.display = "none";
    });
    this.container = container;
    this.element = null;
    this.cursorDom = cursorDom;
    this.type = type;
    this._position = {
      x: 0,
      y: 0
    };
    this.height = 0;
    this.size = 15;
    this.color = color;
    this.element = this.createElement();
    container.appendChild(this.element);
  }

  (0, _createClass2.default)(Cursor, [{
    key: "moveTo",
    value: function moveTo(x, y) {
      if (this.type === "start") {
        this.element.style.left = "".concat(x - this.size * 2, "px");
      } else {
        this.element.style.left = "".concat(x, "px");
      }

      this.element.style.top = "".concat(y + this.height, "px");
    }
  }, {
    key: "position",
    set: function set(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      this._position = {
        x: x,
        y: y
      };
      this.moveTo(x, y);
    },
    get: function get() {
      return this._position;
    }
  }]);
  return Cursor;
}();

exports.default = Cursor;
},{"@babel/runtime-corejs3/core-js-stable/instance/concat":9,"@babel/runtime-corejs3/core-js-stable/object/define-property":15,"@babel/runtime-corejs3/helpers/classCallCheck":27,"@babel/runtime-corejs3/helpers/createClass":28,"@babel/runtime-corejs3/helpers/defineProperty":29,"@babel/runtime-corejs3/helpers/interopRequireDefault":30}],2:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _rect = _interopRequireDefault(require("./rect"));

var Magnifier = /*#__PURE__*/function () {
  function Magnifier(_ref) {
    var _this = this;

    var container = _ref.container,
        rectsColor = _ref.rectsColor,
        backgroundColor = _ref.backgroundColor,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 50 : _ref$height,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 100 : _ref$width,
        _ref$offset = _ref.offset,
        offset = _ref$offset === void 0 ? 50 : _ref$offset;
    (0, _classCallCheck2.default)(this, Magnifier);
    (0, _defineProperty2.default)(this, "moveTo", function (x, y) {
      var _context, _context2, _context3;

      var cWidth = _this.container.getBoundingClientRect().width;

      var cHeight = _this.container.getBoundingClientRect().height;

      _this.slip.style.clipPath = (0, _concat.default)(_context = (0, _concat.default)(_context2 = (0, _concat.default)(_context3 = "inset(\n        ".concat(y - _this.height / 2, "px\n        ")).call(_context3, cWidth - x - _this.width / 2, "px\n        ")).call(_context2, cHeight - y - _this.height / 2, "px\n        ")).call(_context, x - _this.width / 2, "px\n    )");
      _this.clip.style.top = "".concat(y - _this.offset - _this.height / 2, "px");
      _this.clip.style.left = "".concat(x - _this.width / 2, "px");
    });
    (0, _defineProperty2.default)(this, "show", function () {
      _this.clip.style.display = "block";
      _this.slip.style.display = "block";
    });
    (0, _defineProperty2.default)(this, "hide", function () {
      _this.clip.style.display = "none";
      _this.slip.style.display = "none";
    });
    (0, _defineProperty2.default)(this, "createSlip", function () {
      var slip = _this.container.cloneNode(true);

      slip.classList.add("mobile-text-selection-tools", "mobile-text-selection-tools-slip");
      slip.style.pointerEvents = "none";
      slip.style.position = "absolute";
      slip.style.marginTop = 0;
      slip.style.marginRight = 0;
      slip.style.marginBottom = 0;
      slip.style.marginLeft = 0;
      slip.style.top = "".concat(-_this.offset, "px");
      slip.style.left = 0;
      slip.style.backgroundColor = _this.backgroundColor || "#fff";
      slip.style.display = "none";
      slip.style.zIndex = "3";
      return slip;
    });
    (0, _defineProperty2.default)(this, "createClip", function () {
      var clip = document.createElement("div");
      clip.classList.add("mobile-text-selection-tools", "mobile-text-selection-tools-clip");
      clip.style.pointerEvent = "none";
      clip.style.userSelect = "none";
      clip.style.webkitUserSelect = "none";
      clip.style.position = "absolute";
      clip.style.height = "".concat(_this.height, "px");
      clip.style.width = "".concat(_this.width, "px");
      clip.style.boxShadow = "0px 1px 2px 1px #666, inset 0px 0px 2px 2px #fff";
      clip.style.borderRadius = "5px";
      clip.style.display = "none";
      clip.style.zIndex = "3";
      return clip;
    });
    this.container = container;
    this.height = height;
    this.width = width;
    this.offset = offset;
    this.backgroundColor = backgroundColor;
    this._position = {
      x: 0,
      y: 0
    };
    this.slip = this.createSlip();
    this.clip = this.createClip();
    this.rect = null;
    container.appendChild(this.slip);
    container.appendChild(this.clip);
    this.rects = new _rect.default({
      container: this.slip,
      rectsColor: rectsColor
    });
  }

  (0, _createClass2.default)(Magnifier, [{
    key: "position",
    set: function set(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      this._position = {
        x: x,
        y: y
      }; // 触摸的位置 也就是对应的字的位置

      this.moveTo(x, y);
    }
  }]);
  return Magnifier;
}();

exports.default = Magnifier;
},{"./rect":3,"@babel/runtime-corejs3/core-js-stable/instance/concat":9,"@babel/runtime-corejs3/core-js-stable/object/define-property":15,"@babel/runtime-corejs3/helpers/classCallCheck":27,"@babel/runtime-corejs3/helpers/createClass":28,"@babel/runtime-corejs3/helpers/defineProperty":29,"@babel/runtime-corejs3/helpers/interopRequireDefault":30}],3:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _reverse = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/reverse"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var Rect = /*#__PURE__*/function () {
  function Rect(_ref) {
    var _this = this;

    var container = _ref.container,
        _ref$rectsColor = _ref.rectsColor,
        rectsColor = _ref$rectsColor === void 0 ? "rgba(23,136,189,0.35)" : _ref$rectsColor;
    (0, _classCallCheck2.default)(this, Rect);
    (0, _defineProperty2.default)(this, "setRects", function (rects, offsetX, offsetY) {
      _this.reset();

      var rectArray;

      if ((0, _isArray.default)(rects)) {
        rectArray = rects;
      } else {
        rectArray = [rects];
      }

      var elArray = document.createDocumentFragment();
      _this.elements = (0, _map.default)(rectArray).call(rectArray, function (rect) {
        var rectEl = document.createElement("div");
        rectEl.classList.add("mobile-text-selection-tools", "mobile-text-selection-tools-rect");
        rectEl.style.pointerEvents = "none";
        rectEl.style.width = "".concat(rect.width, "px");
        rectEl.style.height = "".concat(rect.height, "px");
        rectEl.style.backgroundColor = _this.rectsColor;
        rectEl.style.position = "absolute";
        rectEl.style.left = "".concat(rect.left - offsetX, "px");
        rectEl.style.top = "".concat(rect.top - offsetY, "px");
        elArray.appendChild(rectEl);
        return rectEl;
      });

      _this.container.appendChild(elArray);
    });
    (0, _defineProperty2.default)(this, "reset", function () {
      var _context, _context2, _context3;

      (0, _forEach.default)(_context = (0, _reverse.default)(_context2 = (0, _slice.default)(_context3 = _this.elements).call(_context3)).call(_context2)).call(_context, function (el) {
        return _this.container.removeChild(el);
      });
      _this.elements = [];
    });
    this.container = container;
    this.rectsColor = rectsColor;
    this.elements = [];
  }

  (0, _createClass2.default)(Rect, [{
    key: "getSelectRects",
    value: function getSelectRects(startNode, endNode, startIndex, endIndex) {
      //  再看看这里怎么回事= =
      var rects = [];

      if (startNode.childNodes.length && startNode.nodeName !== "SCRIPT" && startNode.nodeName !== "STYLE") {
        var childNode = startNode.childNodes[0];
        var rectsChild = this.getSelectRects(childNode, endNode, 0, endIndex);
        rects.push.apply(rects, (0, _toConsumableArray2.default)(rectsChild));
        return rects;
      }

      if (startNode.nodeName === "#text") {
        var rectEndIndex = startNode === endNode ? endIndex : startNode.textContent.length;
        var range = document.createRange();
        range.setStart(startNode, startIndex);
        range.setEnd(startNode, rectEndIndex);
        rects.push.apply(rects, (0, _toConsumableArray2.default)(range.getClientRects()));
      }

      if (startNode === endNode) {
        return rects;
      }

      var nextNode = startNode.nextSibling;

      if (nextNode) {
        var nextRects = this.getSelectRects(nextNode, endNode, 0, endIndex);
        rects.push.apply(rects, (0, _toConsumableArray2.default)(nextRects));
      } else {
        var currentNode = startNode.parentNode;

        if (currentNode === this.container) {
          return [];
        }

        while (currentNode && (currentNode.nextSibling === null || currentNode === this.container)) {
          currentNode = currentNode.parentNode;
        }

        if (currentNode && currentNode === this.container) {
          return [];
        } else if (currentNode) {
          var siblingRects = this.getSelectRects(currentNode.nextSibling, endNode, 0, endIndex);
          rects.push.apply(rects, (0, _toConsumableArray2.default)(siblingRects));
        } else {
          throw new Error("Invalid end node");
        }
      }

      return rects;
    }
  }]);
  return Rect;
}();

exports.default = Rect;
},{"@babel/runtime-corejs3/core-js-stable/array/is-array":7,"@babel/runtime-corejs3/core-js-stable/instance/for-each":10,"@babel/runtime-corejs3/core-js-stable/instance/map":12,"@babel/runtime-corejs3/core-js-stable/instance/reverse":13,"@babel/runtime-corejs3/core-js-stable/instance/slice":14,"@babel/runtime-corejs3/core-js-stable/object/define-property":15,"@babel/runtime-corejs3/helpers/classCallCheck":27,"@babel/runtime-corejs3/helpers/createClass":28,"@babel/runtime-corejs3/helpers/defineProperty":29,"@babel/runtime-corejs3/helpers/interopRequireDefault":30,"@babel/runtime-corejs3/helpers/toConsumableArray":36}],4:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var TextNode = /*#__PURE__*/function () {
  function TextNode(node, offset) {
    (0, _classCallCheck2.default)(this, TextNode);
    this.node = node;
    this.offset = offset;
  }

  (0, _createClass2.default)(TextNode, null, [{
    key: "getSelectText",
    value: function getSelectText(startNode, endNode, startIndex, endIndex) {
      //  再看看这里怎么回事= =
      var text = "";

      if (startNode.childNodes.length && startNode.nodeName !== "SCRIPT" && startNode.nodeName !== "STYLE") {
        var childNode = startNode.childNodes[0];
        var textChild = this.getSelectText(childNode, endNode, 0, endIndex);
        text += textChild;
        return text;
      }

      if (startNode.nodeName === "#text") {
        var textEndIndex = startNode === endNode ? endIndex : startNode.textContent.length;
        text += startNode.textContent.substring(startIndex, textEndIndex);
      }

      if (startNode === endNode) {
        return text;
      }

      var nextNode = startNode.nextSibling;

      if (nextNode) {
        var nextText = this.getSelectText(nextNode, endNode, 0, endIndex);
        text += nextText;
      } else {
        var currentNode = startNode.parentNode;

        while (currentNode && currentNode.nextSibling === null) {
          currentNode = currentNode.parentNode;
        }

        if (currentNode) {
          var siblingText = this.getSelectText(currentNode.nextSibling, endNode, 0, endIndex);
          text += siblingText;
        } else {
          throw new Error("Invalid end node");
        }
      }

      return text;
    }
  }]);
  return TextNode;
}();

exports.default = TextNode;
},{"@babel/runtime-corejs3/core-js-stable/object/define-property":15,"@babel/runtime-corejs3/helpers/classCallCheck":27,"@babel/runtime-corejs3/helpers/createClass":28,"@babel/runtime-corejs3/helpers/interopRequireDefault":30}],5:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.getEventPath = getEventPath;
exports.isSameLine = isSameLine;
exports.isAfterLine = isAfterLine;
exports.isPreviousLine = isPreviousLine;
exports.getSingleRect = getSingleRect;
exports.getNextRectByCurrentNode = getNextRectByCurrentNode;

function getEventPath(evt) {
  return evt.path || evt.composedPath && evt.composedPath() || "";
}

function isSameLine(relativeY, currentY, currentHeight) {
  return currentY >= relativeY - currentHeight / 2 && currentY <= relativeY + currentHeight / 2;
}

function isAfterLine(relativeY, currentY, currentHeight) {
  return currentY > relativeY + currentHeight / 2;
}

function isPreviousLine(relativeY, currentY, currentHeight) {
  return currentY < relativeY - currentHeight / 2;
}

function getSingleRect(node, startIndex, endIndex) {
  var range = document.createRange();
  range.setStart(node, startIndex);
  range.setEnd(node, endIndex);
  var textRects = range.getClientRects();

  if (textRects.length) {
    return textRects[0];
  } else {
    return null;
  }
}

function getNextRectByCurrentNode(node, container) {
  var nextRect = null;
  var nextTextNode = getNextTextNode(node, container);

  if (nextTextNode) {
    nextRect = getSingleRect(nextTextNode, 0, 1);
  }

  return nextRect;
}

function getNextTextNode(node, container) {
  var nextTextNode = getNextTextNodeOrContainer(node, container);

  if (nextTextNode && nextTextNode !== container) {
    return nextTextNode;
  }

  return null;
}

function getNextTextNodeOrContainer(node, container) {
  var nextTextNode = null;

  if (node.classList && node.classList.contains("mobile-text-selection-tools")) {
    return null;
  }

  if (node.childNodes.length) {
    var firstChildNode = node.childNodes[0];

    if (firstChildNode.nodeName === "#text" && !/^\s+$/.test(firstChildNode.textContent)) {
      nextTextNode = firstChildNode;
    } else {
      nextTextNode = getNextTextNodeOrContainer(firstChildNode, container);
    }
  }

  if (nextTextNode) return nextTextNode;
  var nextNode = node.nextSibling;

  while (!nextTextNode && nextNode) {
    if (nextNode.nodeName === "#text" && !/^\s+$/.test(nextNode.textContent)) {
      nextTextNode = nextNode;
    } else {
      nextTextNode = getNextTextNodeOrContainer(nextNode, container);
    }

    if (!nextTextNode) nextNode = nextNode.nextSibling;
  }

  if (nextTextNode) return nextTextNode;
  var parentNode = node.parentNode;
  var parentNextNode;

  while (!parentNextNode && parentNode !== container) {
    parentNextNode = parentNode.nextSibling;
    parentNode = parentNode.parentNode;
  }

  while (!nextTextNode && parentNextNode) {
    if (parentNextNode.nodeName === "#text" && !/^\s+$/.test(parentNextNode.textContent)) {
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
},{"@babel/runtime-corejs3/core-js-stable/object/define-property":15}],6:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _textNode = _interopRequireDefault(require("./textNode"));

var _rect = _interopRequireDefault(require("./rect"));

var _cursor = _interopRequireDefault(require("./cursor"));

var _magnifier = _interopRequireDefault(require("./magnifier"));

var _utils = require("./utils");

var TextSelect = /*#__PURE__*/function () {
  function TextSelect(_ref) {
    var _this = this;

    var container = _ref.container,
        cursorDom = _ref.cursorDom,
        cursorColor = _ref.cursorColor,
        rectsColor = _ref.rectsColor,
        magnifierHeight = _ref.magnifierHeight,
        magnifierWidth = _ref.magnifierWidth,
        magnifierOffset = _ref.magnifierOffset,
        magnifierBackgroundColor = _ref.magnifierBackgroundColor,
        _ref$longTapDuration = _ref.longTapDuration,
        longTapDuration = _ref$longTapDuration === void 0 ? 600 : _ref$longTapDuration,
        _ref$tokenizer = _ref.tokenizer,
        tokenizer = _ref$tokenizer === void 0 ? function () {} : _ref$tokenizer,
        _ref$onFinish = _ref.onFinish,
        onFinish = _ref$onFinish === void 0 ? function () {} : _ref$onFinish,
        _ref$onStart = _ref.onStart,
        onStart = _ref$onStart === void 0 ? function () {} : _ref$onStart,
        _ref$onCancel = _ref.onCancel,
        onCancel = _ref$onCancel === void 0 ? function () {} : _ref$onCancel;
    (0, _classCallCheck2.default)(this, TextSelect);
    (0, _defineProperty2.default)(this, "blur", function () {
      // 失焦时候隐藏所有指针和底色
      _this.cursor.start.hide();

      _this.cursor.end.hide();

      _this.rects.reset();

      _this.selectStatus = "none";

      _this.magnifier.hide();

      _this.onCancel();
    });
    (0, _defineProperty2.default)(this, "init", function () {
      // 初始化
      _this.container.oncontextmenu = function (e) {
        e.preventDefault();
        return;
      };

      _this.container.style.userSelect = "none";
      _this.container.style.webkitUserSelect = "none";
      _this.container.style.webkitTouchCallout = "none";
      _this.magnifier = new _magnifier.default({
        container: _this.container,
        rectsColor: _this.rectsColor,
        backgroundColor: _this.magnifierBackgroundColor,
        height: _this.magnifierHeight,
        width: _this.magnifierWidth,
        offset: _this.magnifierOffset
      });

      _this.container.addEventListener("touchstart", _this.handleTouchStart);

      _this.container.addEventListener("touchmove", _this.handleTouchMove);

      _this.container.addEventListener("touchend", _this.handleTouchEnd);

      _this.container.style.position = "relative";
      _this.cursor.start = new _cursor.default({
        container: _this.container,
        cursorDom: _this.cursorDom,
        type: "start",
        color: _this.cursorColor
      });
      _this.cursor.end = new _cursor.default({
        container: _this.container,
        cursorDom: _this.cursorDom,
        type: "end",
        color: _this.cursorColor
      });
      _this.rects = new _rect.default({
        container: _this.container,
        rectsColor: _this.rectsColor
      });
    });
    (0, _defineProperty2.default)(this, "destroy", function () {
      _this.container.oncontextmenu = null;

      _this.container.removeEventListener("touchstart", _this.handleTouchStart);

      _this.container.removeEventListener("touchmove", _this.handleTouchMove);

      _this.container.removeEventListener("touchend", _this.handleTouchEnd);

      var tools = _this.container.getElementsByClassName("mobile-text-selection-tools");

      for (var i = tools.length - 1; i >= 0; i--) {
        tools[i].remove();
      }

      _this.container._textSelection = null;
    });
    (0, _defineProperty2.default)(this, "handleTouchStart", function (e) {
      var _context, _context2;

      var event = e; // 触摸位置

      var touchPoint = e.changedTouches[0];
      var mouseX = touchPoint.clientX;
      var mouseY = touchPoint.clientY; // 触摸时间 用于结束时候的计算

      _this.touchStartTime = (0, _now.default)(); // 触摸位置 用于结束时候的计算

      _this.touchStartPosition = {
        x: mouseX,
        y: mouseY
      }; // 是否正在触摸左右cursor

      var touchStartCursor = (0, _indexOf.default)(_context = (0, _utils.getEventPath)(event)).call(_context, _this.cursor.start.element) > -1;
      var touchEndCursor = (0, _indexOf.default)(_context2 = (0, _utils.getEventPath)(event)).call(_context2, _this.cursor.end.element) > -1;

      if (touchStartCursor) {
        // 记录正在移动的cursor 用于之后的cursor位置交换判断
        _this.movingCursor = _this.cursor.start; // 状态设置成正在选择文字 用于禁止页面滚动

        _this.selectStatus = "selecting";
        event.stopPropagation();
      } else if (touchEndCursor) {
        _this.movingCursor = _this.cursor.end;
        _this.selectStatus = "selecting";
        event.stopPropagation();
      } else {
        // 不是的话就延时检查是不是长按事件
        _this.longTapTimer = (0, _setTimeout2.default)(function () {
          event.stopPropagation(); // 是长按选择事件
          // 开始选择文字的回调

          _this.onStart(); // 处理长按选择事件


          if (event.target) {
            _this.magnifier.show();

            _this.handleLongTap(event.target, mouseX, mouseY);
          }

          _this.selectStatus = "selecting";
        }, _this.longTapDuration);
      }
    });
    (0, _defineProperty2.default)(this, "handleTouchMove", function (e) {
      var event = e; // 如果正在选择文字 则禁止滚动

      if (_this.selectStatus === "selecting") {
        event.stopPropagation();
        event.preventDefault();
        var touchPoint = event.changedTouches[0]; // 限制移动范围

        var mouseX = touchPoint.clientX;
        var mouseY = touchPoint.clientY;

        var containerBound = _this.container.getBoundingClientRect();

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
        } // 如果正在移动cursor 延时检查是不是拖动选择事件


        if (_this.movingCursor) {
          // 是拖动选择事件
          // 开始选择文字的回调
          _this.onStart(); // 移动后的位置
          // 隐藏正在移动的cursor 才能获取坐标位置的文本元素 不然e.target就是cursor拉


          _this.movingCursor.hide(); // 获取目标 这里有一个问题就是我使用坐标的时候 一开始按住的是cursor的坐标 但是后来移动的时候 触摸的位置不再是cursor的坐标了 影响不大


          var target = document.elementFromPoint(mouseX, mouseY); // 处理iframe情况

          if (target && target instanceof HTMLIFrameElement) {
            target = target.contentWindow.document.elementFromPoint(mouseX, mouseY);
          }

          _this.cursor.start.show();

          _this.cursor.end.show(); // 处理拖动cursor事件


          if (target) {
            _this.magnifier.show();

            _this.moveCursor(target, mouseX, mouseY);
          }
        } else if (_this.rects) {
          var _target = document.elementFromPoint(mouseX, mouseY); // 处理iframe情况


          if (_target && _target instanceof HTMLIFrameElement) {
            _target = _target.contentWindow.document.elementFromPoint(mouseX, mouseY);
          }

          if (_target) {
            _this.magnifier.show();

            _this.handleLongTap(_target, mouseX, mouseY);
          } // 长按以后的移动

        }
      }

      clearTimeout(_this.longTapTimer);
      _this.longTapTimer = null;
    });
    (0, _defineProperty2.default)(this, "handleTouchEnd", function (e) {
      var event = e; // 触摸结束 定时器都清空

      clearTimeout(_this.longTapTimer);
      _this.longTapTimer = null; // 状态清空

      _this.movingCursor = null;

      _this.magnifier.hide();

      var touchPoint = event.changedTouches[0];

      if ((0, _now.default)() - _this.touchStartTime < _this.longTapDuration && touchPoint.clientX === _this.touchStartPosition.x && touchPoint.clientY === _this.touchStartPosition.y) {
        // 当触碰结束时 如果不是移动事件的结束 也不是长按事件的结束 就当作普通点击处理
        _this.blur();
      } else {
        // 如果是长按或者移动事件结束 判断有没有选区
        // 有选取的话就弹窗 没选区就啥也不干 有时候有选区但是没选到字呢..
        // 获取选择的文本
        event.stopPropagation();

        var text = _this.getText();

        if (_this.rects.elements.length && text) {
          // 选择完成后的回调
          _this.onFinish({
            text: text,
            startX: _this.cursor.start.position.x,
            startY: _this.cursor.start.position.y,
            endX: _this.cursor.end.position.x,
            endY: _this.cursor.end.position.y
          }); // 状态设置成已完成选择


          _this.selectStatus = "finished";
        }
      }
    });
    (0, _defineProperty2.default)(this, "getText", function () {
      // 获取选择的文标
      // textNode 是在坐标移动时候计算的
      if (!_this.textNode.start || !_this.textNode.end) return;

      var text = _textNode.default.getSelectText(_this.textNode.start.node, _this.textNode.end.node, _this.textNode.start.offset, _this.textNode.end.offset);

      return text;
    });
    (0, _defineProperty2.default)(this, "moveCursor", function (element, x, y) {
      // 移动cursor事件 用于计算cursor的正确位置并显示
      // 计算移动到的[文字]的坐标信息和并保存文字节点信息
      if (!element || /^\s+$/.test(element)) return;

      var _ref2 = _this.getMoveOrTapRectPosition(element, x, y) || {},
          moveX = _ref2.x,
          moveY = _ref2.y,
          node = _ref2.node,
          index = _ref2.index,
          currentHeight = _ref2.height; // 计算cursor需不需要交换


      var currentX = moveX - _this.screenRelativeOffset.x;
      var currentY = moveY - _this.screenRelativeOffset.y; // 如果没找到node 或者坐标是无效值(比如element是另一个cursor..) 就不再执行了

      if (!node || !currentX && !currentY) return;
      var unmovingCursor = _this.movingCursor === _this.cursor.start ? _this.cursor.end : _this.cursor.start; // 如果左右cursor一个位置 就都隐藏掉拉

      if (unmovingCursor.position.x === currentX && unmovingCursor.position.y === currentY) {
        _this.cursor.start.hide();

        _this.cursor.end.hide();

        _this.rects.reset();

        return;
      }

      if (_this.movingCursor === _this.cursor.start) {
        //   正在移动start
        var endPosition = _this.cursor.end.position;

        if ((0, _utils.isPreviousLine)(endPosition.y, currentY, currentHeight) || (0, _utils.isSameLine)(endPosition.y, currentY, currentHeight) && currentX < endPosition.x) {
          // 不需要交换
          _this.textNode.start = new _textNode.default(node, index);
        } else {
          // 需要交换
          _this.cursor.start.position = _this.cursor.end.position;
          _this.movingCursor = _this.cursor.end;
          _this.textNode.start = new _textNode.default(_this.textNode.end.node, _this.textNode.end.offset);
          _this.textNode.end = new _textNode.default(node, index);
          return;
        }
      } else {
        //   正在移动end
        var startPosition = _this.cursor.start.position;

        if ((0, _utils.isAfterLine)(startPosition.y, currentY, currentHeight) || (0, _utils.isSameLine)(startPosition.y, currentY, currentHeight) && currentX > startPosition.x) {
          // 不需要交换
          _this.textNode.end = new _textNode.default(node, index);
        } else {
          // 需要交换
          _this.cursor.end.position = _this.cursor.start.position;
          _this.movingCursor = _this.cursor.start;
          _this.textNode.end = new _textNode.default(_this.textNode.start.node, _this.textNode.start.offset);
          _this.textNode.start = new _textNode.default(node, index);
          return;
        }
      } // 设置新的坐标位置 在长按的时候就已经显示cursor拉 所以不需要再显示啦


      _this.movingCursor.position = {
        x: moveX - _this.screenRelativeOffset.x,
        y: moveY - _this.screenRelativeOffset.y
      };
      _this.magnifier.position = {
        x: moveX - _this.screenRelativeOffset.x,
        y: moveY - _this.screenRelativeOffset.y
      }; // 计算阴影

      var rects = _this.rects.getSelectRects(_this.textNode.start.node, _this.textNode.end.node, _this.textNode.start.offset, _this.textNode.end.offset);

      if (rects.length) {
        // 显示阴影
        _this.rects.setRects(rects, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y); // TODO 放大镜的rect


        _this.magnifier.rects.setRects(rects, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y);
      }
    });
    (0, _defineProperty2.default)(this, "handleLongTap", function (element, x, y) {
      // 长按事件
      _this.magnifier.position = {
        x: x - _this.screenRelativeOffset.x,
        y: y - _this.screenRelativeOffset.y
      }; // 计算被长按的[文字]的坐标信息和并保存文字节点信息

      var _ref3 = _this.getMoveOrTapRectPosition(element, x, y) || {},
          node = _ref3.node,
          rect = _ref3.rect,
          index = _ref3.index,
          height = _ref3.height; // 判断有选中位置 防止在空白处长按


      if (!rect || rect && rect.length === 0) return;

      var _ref4 = _this.tokenizer && _this.tokenizer(node, index) || [-1, 0],
          _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
          cutIndex = _ref5[0],
          cutLength = _ref5[1];

      if (typeof cutIndex === "number" && typeof cutLength === "number" && cutIndex > -1 && cutLength > 1) {
        // 有分词
        _this.textNode.start = new _textNode.default(node, cutIndex);
        _this.textNode.end = new _textNode.default(node, cutIndex + cutLength); // 计算阴影

        var rects = _this.rects.getSelectRects(_this.textNode.start.node, _this.textNode.end.node, _this.textNode.start.offset, _this.textNode.end.offset);

        if (rects.length) {
          // 显示阴影
          _this.rects.setRects(rects, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y); // 设置cursor位置


          _this.cursor.start.height = height;
          _this.cursor.end.height = height;
          _this.cursor.start.position = {
            x: rects[0].x - _this.screenRelativeOffset.x,
            y: rects[0].y - _this.screenRelativeOffset.y
          };
          _this.cursor.end.position = {
            x: rects[rects.length - 1].x + rects[rects.length - 1].width - _this.screenRelativeOffset.x,
            y: rects[rects.length - 1].y - _this.screenRelativeOffset.y
          }; // 显示cursor 后面移动的时候不需要再显示了

          _this.cursor.start.show();

          _this.cursor.end.show(); // 放大镜的rect


          _this.magnifier.rects.setRects(rects, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y);
        }
      } else {
        // 没有分词
        _this.textNode.start = new _textNode.default(node, index); // index 表示第几个字 (是下标+1的正数)

        _this.textNode.end = new _textNode.default(node, index + 1); // 长按就一个字 不需要再计算阴影位置了 直接显示阴影

        _this.rects.setRects(rect, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y); // 设置cursor位置


        _this.cursor.start.height = height;
        _this.cursor.end.height = height;
        _this.cursor.start.position = {
          x: rect.x - _this.screenRelativeOffset.x,
          y: rect.y - _this.screenRelativeOffset.y
        };
        _this.cursor.end.position = {
          x: rect.x + rect.width - _this.screenRelativeOffset.x,
          y: rect.y - _this.screenRelativeOffset.y
        }; // 显示cursor 后面移动的时候不需要再显示了

        _this.cursor.start.show();

        _this.cursor.end.show(); // TODO 放大镜的rect


        _this.magnifier.rects.setRects(rect, _this.screenRelativeOffset.x, _this.screenRelativeOffset.y);
      }
    });
    (0, _defineProperty2.default)(this, "getMoveOrTapRectPosition", function (element, x, y) {
      // 计算移动或长按位置的[文字]坐标和节点信息
      if (!_this.container.contains(element)) {
        // 如果移动到container外面就不计算了
        return null;
      }

      if (element.nodeName === "#comment" || element.classList.contains("mobile-text-selection-tools")) {
        return null;
      }

      if (!element || element && !element.childNodes) return null; // 计算行高 用于判断y坐标

      var lineHeight = Number(window.getComputedStyle(element).lineHeight.replace("px", ""));

      for (var i = 0; i < element.childNodes.length; i++) {
        var node = element.childNodes[i]; // 如果是文本节点

        if (node.nodeName === "#text") {
          var content = node.textContent;
          window.getSelection().removeAllRanges(); // 遍历节点文本内容

          for (var j = 0; j < content.length; j++) {
            // content[j] 是一个字
            // 用range对象计算这个字的位置信息
            var rect = (0, _utils.getSingleRect)(node, j, j + 1);
            if (!rect) continue;
            lineHeight = lineHeight || rect.height;
            var margin = lineHeight / 2;

            if (rect.left < x && // rect.right > x &&
            rect.top - margin < y && rect.bottom + margin > y) {
              var nextRect = null;

              if (j === content.length - 1) {
                // 是当前标签最后一个字 检查下一个标签的第一个字
                nextRect = (0, _utils.getNextRectByCurrentNode)(node, _this.container);
              } else {
                // 当前标签后面还有字
                nextRect = (0, _utils.getSingleRect)(node, j + 1, j + 2);
              }

              if (rect.right > x) {
                return {
                  x: rect.left,
                  y: rect.top,
                  node: node,
                  index: j,
                  height: rect.height,
                  width: rect.width,
                  rect: rect
                };
              }

              var isLineEnd = !nextRect || nextRect && nextRect.right < rect.left;

              if (isLineEnd) {
                return {
                  x: rect.right,
                  y: rect.top,
                  node: node,
                  index: j + 1,
                  height: rect.height,
                  width: rect.width,
                  rect: rect
                };
              }
            }
          }
        } else if (node.nodeName === "#comment" || node.classList.contains("mobile-text-selection-tools")) {
          // 如果是contianer里的selection相关组件 也不计算
          continue;
        } else {
          var result = _this.getMoveOrTapRectPosition(node, x, y);

          if (result) return result;
        }
      }

      return null;
    });
    if (!container) throw Error("TextSelection 容器不能为空");

    if (tokenizer && typeof tokenizer !== "function") {
      throw Error("参数tokenizer类型错误");
    }

    if (onFinish && typeof onFinish !== "function") {
      throw Error("参数onFinish类型错误");
    }

    if (onStart && typeof onStart !== "function") {
      throw Error("参数onStart类型错误");
    }

    if (onCancel && typeof onCancel !== "function") {
      throw Error("参数onCancel类型错误");
    }

    if (container._textSelection) {
      container._textSelection.destroy();
    }

    this.container = container;
    this.longTapTimer = null;
    this.longTapDuration = longTapDuration;
    this.touchStartPosition = {
      x: 0,
      y: 0
    };
    this.touchStartTime = null;
    this.touchMoveDuration = 0;
    this.cursorColor = cursorColor;
    this.cursorDom = cursorDom;
    this.cursor = {
      start: null,
      end: null
    };
    this.textNode = {
      start: null,
      end: null
    };
    this.movingCursor = null;
    this.mask = null;
    this.selectStatus = "none"; // selecting finished
    // 分词

    this.tokenizer = tokenizer; // 回调

    this.onFinish = onFinish;
    this.onStart = onStart;
    this.onCancel = onCancel; // 选中标记

    this.rects = null;
    this.rectsColor = rectsColor; // 放大镜

    this.magnifier = null;
    this.magnifierHeight = magnifierHeight;
    this.magnifierWidth = magnifierWidth;
    this.magnifierOffset = magnifierOffset;
    this.magnifierBackgroundColor = magnifierBackgroundColor;
    container._textSelection = this;
  }

  (0, _createClass2.default)(TextSelect, [{
    key: "screenRelativeOffset",
    get: function get() {
      // 获取container距离顶部的举例 因为页面可以滚动嘛 用于所有的y坐标计算
      var _this$container$getBo = this.container.getBoundingClientRect(),
          top = _this$container$getBo.top,
          left = _this$container$getBo.left;

      return {
        x: left,
        y: top
      };
    }
  }]);
  return TextSelect;
}();

exports.default = TextSelect;
},{"./cursor":1,"./magnifier":2,"./rect":3,"./textNode":4,"./utils":5,"@babel/runtime-corejs3/core-js-stable/date/now":8,"@babel/runtime-corejs3/core-js-stable/instance/index-of":11,"@babel/runtime-corejs3/core-js-stable/object/define-property":15,"@babel/runtime-corejs3/core-js-stable/set-timeout":16,"@babel/runtime-corejs3/helpers/classCallCheck":27,"@babel/runtime-corejs3/helpers/createClass":28,"@babel/runtime-corejs3/helpers/defineProperty":29,"@babel/runtime-corejs3/helpers/interopRequireDefault":30,"@babel/runtime-corejs3/helpers/slicedToArray":35}],7:[function(require,module,exports){
module.exports = require("core-js-pure/stable/array/is-array");
},{"core-js-pure/stable/array/is-array":185}],8:[function(require,module,exports){
module.exports = require("core-js-pure/stable/date/now");
},{"core-js-pure/stable/date/now":187}],9:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/concat");
},{"core-js-pure/stable/instance/concat":188}],10:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/for-each");
},{"core-js-pure/stable/instance/for-each":189}],11:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/index-of");
},{"core-js-pure/stable/instance/index-of":190}],12:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/map");
},{"core-js-pure/stable/instance/map":191}],13:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/reverse");
},{"core-js-pure/stable/instance/reverse":192}],14:[function(require,module,exports){
module.exports = require("core-js-pure/stable/instance/slice");
},{"core-js-pure/stable/instance/slice":193}],15:[function(require,module,exports){
module.exports = require("core-js-pure/stable/object/define-property");
},{"core-js-pure/stable/object/define-property":194}],16:[function(require,module,exports){
module.exports = require("core-js-pure/stable/set-timeout");
},{"core-js-pure/stable/set-timeout":195}],17:[function(require,module,exports){
module.exports = require("core-js-pure/features/array/from");
},{"core-js-pure/features/array/from":54}],18:[function(require,module,exports){
module.exports = require("core-js-pure/features/array/is-array");
},{"core-js-pure/features/array/is-array":55}],19:[function(require,module,exports){
module.exports = require("core-js-pure/features/get-iterator");
},{"core-js-pure/features/get-iterator":56}],20:[function(require,module,exports){
module.exports = require("core-js-pure/features/instance/slice");
},{"core-js-pure/features/instance/slice":57}],21:[function(require,module,exports){
module.exports = require("core-js-pure/features/is-iterable");
},{"core-js-pure/features/is-iterable":58}],22:[function(require,module,exports){
module.exports = require("core-js-pure/features/object/define-property");
},{"core-js-pure/features/object/define-property":59}],23:[function(require,module,exports){
module.exports = require("core-js-pure/features/symbol");
},{"core-js-pure/features/symbol":60}],24:[function(require,module,exports){
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
},{}],25:[function(require,module,exports){
var _Array$isArray = require("../core-js/array/is-array");

function _arrayWithHoles(arr) {
  if (_Array$isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
},{"../core-js/array/is-array":18}],26:[function(require,module,exports){
var _Array$isArray = require("../core-js/array/is-array");

var arrayLikeToArray = require("./arrayLikeToArray");

function _arrayWithoutHoles(arr) {
  if (_Array$isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
},{"../core-js/array/is-array":18,"./arrayLikeToArray":24}],27:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],28:[function(require,module,exports){
var _Object$defineProperty = require("../core-js/object/define-property");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{"../core-js/object/define-property":22}],29:[function(require,module,exports){
var _Object$defineProperty = require("../core-js/object/define-property");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{"../core-js/object/define-property":22}],30:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],31:[function(require,module,exports){
var _Array$from = require("../core-js/array/from");

var _isIterable = require("../core-js/is-iterable");

var _Symbol = require("../core-js/symbol");

function _iterableToArray(iter) {
  if (typeof _Symbol !== "undefined" && _isIterable(Object(iter))) return _Array$from(iter);
}

module.exports = _iterableToArray;
},{"../core-js/array/from":17,"../core-js/is-iterable":21,"../core-js/symbol":23}],32:[function(require,module,exports){
var _getIterator = require("../core-js/get-iterator");

var _isIterable = require("../core-js/is-iterable");

var _Symbol = require("../core-js/symbol");

function _iterableToArrayLimit(arr, i) {
  if (typeof _Symbol === "undefined" || !_isIterable(Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
},{"../core-js/get-iterator":19,"../core-js/is-iterable":21,"../core-js/symbol":23}],33:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
},{}],34:[function(require,module,exports){
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
},{}],35:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles");

var iterableToArrayLimit = require("./iterableToArrayLimit");

var unsupportedIterableToArray = require("./unsupportedIterableToArray");

var nonIterableRest = require("./nonIterableRest");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
},{"./arrayWithHoles":25,"./iterableToArrayLimit":32,"./nonIterableRest":33,"./unsupportedIterableToArray":37}],36:[function(require,module,exports){
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var unsupportedIterableToArray = require("./unsupportedIterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":26,"./iterableToArray":31,"./nonIterableSpread":34,"./unsupportedIterableToArray":37}],37:[function(require,module,exports){
var _Array$from = require("../core-js/array/from");

var _sliceInstanceProperty = require("../core-js/instance/slice");

var arrayLikeToArray = require("./arrayLikeToArray");

function _unsupportedIterableToArray(o, minLen) {
  var _context;

  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);

  var n = _sliceInstanceProperty(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return _Array$from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
},{"../core-js/array/from":17,"../core-js/instance/slice":20,"./arrayLikeToArray":24}],38:[function(require,module,exports){
require('../../modules/es.string.iterator');
require('../../modules/es.array.from');
var path = require('../../internals/path');

module.exports = path.Array.from;

},{"../../internals/path":128,"../../modules/es.array.from":150,"../../modules/es.string.iterator":162}],39:[function(require,module,exports){
require('../../modules/es.array.is-array');
var path = require('../../internals/path');

module.exports = path.Array.isArray;

},{"../../internals/path":128,"../../modules/es.array.is-array":152}],40:[function(require,module,exports){
require('../../../modules/es.array.concat');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').concat;

},{"../../../internals/entry-virtual":89,"../../../modules/es.array.concat":148}],41:[function(require,module,exports){
require('../../../modules/es.array.for-each');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').forEach;

},{"../../../internals/entry-virtual":89,"../../../modules/es.array.for-each":149}],42:[function(require,module,exports){
require('../../../modules/es.array.index-of');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').indexOf;

},{"../../../internals/entry-virtual":89,"../../../modules/es.array.index-of":151}],43:[function(require,module,exports){
require('../../../modules/es.array.map');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').map;

},{"../../../internals/entry-virtual":89,"../../../modules/es.array.map":154}],44:[function(require,module,exports){
require('../../../modules/es.array.reverse');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').reverse;

},{"../../../internals/entry-virtual":89,"../../../modules/es.array.reverse":155}],45:[function(require,module,exports){
require('../../../modules/es.array.slice');
var entryVirtual = require('../../../internals/entry-virtual');

module.exports = entryVirtual('Array').slice;

},{"../../../internals/entry-virtual":89,"../../../modules/es.array.slice":156}],46:[function(require,module,exports){
require('../../modules/es.date.now');
var path = require('../../internals/path');

module.exports = path.Date.now;

},{"../../internals/path":128,"../../modules/es.date.now":157}],47:[function(require,module,exports){
var concat = require('../array/virtual/concat');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.concat;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.concat) ? concat : own;
};

},{"../array/virtual/concat":40}],48:[function(require,module,exports){
var indexOf = require('../array/virtual/index-of');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.indexOf;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.indexOf) ? indexOf : own;
};

},{"../array/virtual/index-of":42}],49:[function(require,module,exports){
var map = require('../array/virtual/map');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.map;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.map) ? map : own;
};

},{"../array/virtual/map":43}],50:[function(require,module,exports){
var reverse = require('../array/virtual/reverse');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.reverse;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.reverse) ? reverse : own;
};

},{"../array/virtual/reverse":44}],51:[function(require,module,exports){
var slice = require('../array/virtual/slice');

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.slice;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.slice) ? slice : own;
};

},{"../array/virtual/slice":45}],52:[function(require,module,exports){
require('../../modules/es.object.define-property');
var path = require('../../internals/path');

var Object = path.Object;

var defineProperty = module.exports = function defineProperty(it, key, desc) {
  return Object.defineProperty(it, key, desc);
};

if (Object.defineProperty.sham) defineProperty.sham = true;

},{"../../internals/path":128,"../../modules/es.object.define-property":160}],53:[function(require,module,exports){
require('../../modules/es.array.concat');
require('../../modules/es.object.to-string');
require('../../modules/es.symbol');
require('../../modules/es.symbol.async-iterator');
require('../../modules/es.symbol.description');
require('../../modules/es.symbol.has-instance');
require('../../modules/es.symbol.is-concat-spreadable');
require('../../modules/es.symbol.iterator');
require('../../modules/es.symbol.match');
require('../../modules/es.symbol.match-all');
require('../../modules/es.symbol.replace');
require('../../modules/es.symbol.search');
require('../../modules/es.symbol.species');
require('../../modules/es.symbol.split');
require('../../modules/es.symbol.to-primitive');
require('../../modules/es.symbol.to-string-tag');
require('../../modules/es.symbol.unscopables');
require('../../modules/es.math.to-string-tag');
require('../../modules/es.json.to-string-tag');
var path = require('../../internals/path');

module.exports = path.Symbol;

},{"../../internals/path":128,"../../modules/es.array.concat":148,"../../modules/es.json.to-string-tag":158,"../../modules/es.math.to-string-tag":159,"../../modules/es.object.to-string":161,"../../modules/es.symbol":168,"../../modules/es.symbol.async-iterator":163,"../../modules/es.symbol.description":164,"../../modules/es.symbol.has-instance":165,"../../modules/es.symbol.is-concat-spreadable":166,"../../modules/es.symbol.iterator":167,"../../modules/es.symbol.match":170,"../../modules/es.symbol.match-all":169,"../../modules/es.symbol.replace":171,"../../modules/es.symbol.search":172,"../../modules/es.symbol.species":173,"../../modules/es.symbol.split":174,"../../modules/es.symbol.to-primitive":175,"../../modules/es.symbol.to-string-tag":176,"../../modules/es.symbol.unscopables":177}],54:[function(require,module,exports){
var parent = require('../../es/array/from');

module.exports = parent;

},{"../../es/array/from":38}],55:[function(require,module,exports){
var parent = require('../../es/array/is-array');

module.exports = parent;

},{"../../es/array/is-array":39}],56:[function(require,module,exports){
require('../modules/web.dom-collections.iterator');
require('../modules/es.string.iterator');
var getIterator = require('../internals/get-iterator');

module.exports = getIterator;

},{"../internals/get-iterator":96,"../modules/es.string.iterator":162,"../modules/web.dom-collections.iterator":183}],57:[function(require,module,exports){
var parent = require('../../es/instance/slice');

module.exports = parent;

},{"../../es/instance/slice":51}],58:[function(require,module,exports){
require('../modules/web.dom-collections.iterator');
require('../modules/es.string.iterator');
var isIterable = require('../internals/is-iterable');

module.exports = isIterable;

},{"../internals/is-iterable":108,"../modules/es.string.iterator":162,"../modules/web.dom-collections.iterator":183}],59:[function(require,module,exports){
var parent = require('../../es/object/define-property');

module.exports = parent;

},{"../../es/object/define-property":52}],60:[function(require,module,exports){
var parent = require('../../es/symbol');
require('../../modules/esnext.symbol.async-dispose');
require('../../modules/esnext.symbol.dispose');
require('../../modules/esnext.symbol.observable');
require('../../modules/esnext.symbol.pattern-match');
// TODO: Remove from `core-js@4`
require('../../modules/esnext.symbol.replace-all');

module.exports = parent;

},{"../../es/symbol":53,"../../modules/esnext.symbol.async-dispose":178,"../../modules/esnext.symbol.dispose":179,"../../modules/esnext.symbol.observable":180,"../../modules/esnext.symbol.pattern-match":181,"../../modules/esnext.symbol.replace-all":182}],61:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

},{}],62:[function(require,module,exports){
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

},{"../internals/is-object":109}],63:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],64:[function(require,module,exports){
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

},{"../internals/is-object":109}],65:[function(require,module,exports){
'use strict';
var $forEach = require('../internals/array-iteration').forEach;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

},{"../internals/array-iteration":68,"../internals/array-method-is-strict":70,"../internals/array-method-uses-to-length":71}],66:[function(require,module,exports){
'use strict';
var bind = require('../internals/function-bind-context');
var toObject = require('../internals/to-object');
var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing');
var isArrayIteratorMethod = require('../internals/is-array-iterator-method');
var toLength = require('../internals/to-length');
var createProperty = require('../internals/create-property');
var getIteratorMethod = require('../internals/get-iterator-method');

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

},{"../internals/call-with-safe-iteration-closing":73,"../internals/create-property":81,"../internals/function-bind-context":93,"../internals/get-iterator-method":95,"../internals/is-array-iterator-method":105,"../internals/to-length":140,"../internals/to-object":141}],67:[function(require,module,exports){
var toIndexedObject = require('../internals/to-indexed-object');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-absolute-index":137,"../internals/to-indexed-object":138,"../internals/to-length":140}],68:[function(require,module,exports){
var bind = require('../internals/function-bind-context');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var arraySpeciesCreate = require('../internals/array-species-create');

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

},{"../internals/array-species-create":72,"../internals/function-bind-context":93,"../internals/indexed-object":102,"../internals/to-length":140,"../internals/to-object":141}],69:[function(require,module,exports){
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

},{"../internals/engine-v8-version":88,"../internals/fails":92,"../internals/well-known-symbol":147}],70:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

},{"../internals/fails":92}],71:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var has = require('../internals/has');

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

},{"../internals/descriptors":84,"../internals/fails":92,"../internals/has":98}],72:[function(require,module,exports){
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

},{"../internals/is-array":106,"../internals/is-object":109,"../internals/well-known-symbol":147}],73:[function(require,module,exports){
var anObject = require('../internals/an-object');

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

},{"../internals/an-object":64}],74:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

},{"../internals/well-known-symbol":147}],75:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],76:[function(require,module,exports){
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classofRaw = require('../internals/classof-raw');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

},{"../internals/classof-raw":75,"../internals/to-string-tag-support":143,"../internals/well-known-symbol":147}],77:[function(require,module,exports){
var fails = require('../internals/fails');

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

},{"../internals/fails":92}],78:[function(require,module,exports){
'use strict';
var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype;
var create = require('../internals/object-create');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var setToStringTag = require('../internals/set-to-string-tag');
var Iterators = require('../internals/iterators');

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

},{"../internals/create-property-descriptor":80,"../internals/iterators":112,"../internals/iterators-core":111,"../internals/object-create":115,"../internals/set-to-string-tag":132}],79:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/create-property-descriptor":80,"../internals/descriptors":84,"../internals/object-define-property":117}],80:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],81:[function(require,module,exports){
'use strict';
var toPrimitive = require('../internals/to-primitive');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

},{"../internals/create-property-descriptor":80,"../internals/object-define-property":117,"../internals/to-primitive":142}],82:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var createIteratorConstructor = require('../internals/create-iterator-constructor');
var getPrototypeOf = require('../internals/object-get-prototype-of');
var setPrototypeOf = require('../internals/object-set-prototype-of');
var setToStringTag = require('../internals/set-to-string-tag');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');
var Iterators = require('../internals/iterators');
var IteratorsCore = require('../internals/iterators-core');

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

},{"../internals/create-iterator-constructor":78,"../internals/create-non-enumerable-property":79,"../internals/export":91,"../internals/is-pure":110,"../internals/iterators":112,"../internals/iterators-core":111,"../internals/object-get-prototype-of":122,"../internals/object-set-prototype-of":126,"../internals/redefine":129,"../internals/set-to-string-tag":132,"../internals/well-known-symbol":147}],83:[function(require,module,exports){
var path = require('../internals/path');
var has = require('../internals/has');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineProperty = require('../internals/object-define-property').f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};

},{"../internals/has":98,"../internals/object-define-property":117,"../internals/path":128,"../internals/well-known-symbol-wrapped":146}],84:[function(require,module,exports){
var fails = require('../internals/fails');

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":92}],85:[function(require,module,exports){
var global = require('../internals/global');
var isObject = require('../internals/is-object');

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":97,"../internals/is-object":109}],86:[function(require,module,exports){
// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

},{}],87:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('navigator', 'userAgent') || '';

},{"../internals/get-built-in":94}],88:[function(require,module,exports){
var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;

},{"../internals/engine-user-agent":87,"../internals/global":97}],89:[function(require,module,exports){
var path = require('../internals/path');

module.exports = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

},{"../internals/path":128}],90:[function(require,module,exports){
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],91:[function(require,module,exports){
'use strict';
var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var isForced = require('../internals/is-forced');
var path = require('../internals/path');
var bind = require('../internals/function-bind-context');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return NativeConstructor.apply(this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : (global[TARGET] || {}).prototype;

  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

    // bind timers to global for call from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global);
    // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && typeof sourceProperty == 'function') resultProperty = bind(Function.call, sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!has(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
      // export real prototype methods
      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};

},{"../internals/create-non-enumerable-property":79,"../internals/function-bind-context":93,"../internals/global":97,"../internals/has":98,"../internals/is-forced":107,"../internals/object-get-own-property-descriptor":118,"../internals/path":128}],92:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],93:[function(require,module,exports){
var aFunction = require('../internals/a-function');

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-function":61}],94:[function(require,module,exports){
var path = require('../internals/path');
var global = require('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

},{"../internals/global":97,"../internals/path":128}],95:[function(require,module,exports){
var classof = require('../internals/classof');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"../internals/classof":76,"../internals/iterators":112,"../internals/well-known-symbol":147}],96:[function(require,module,exports){
var anObject = require('../internals/an-object');
var getIteratorMethod = require('../internals/get-iterator-method');

module.exports = function (it) {
  var iteratorMethod = getIteratorMethod(it);
  if (typeof iteratorMethod != 'function') {
    throw TypeError(String(it) + ' is not iterable');
  } return anObject(iteratorMethod.call(it));
};

},{"../internals/an-object":64,"../internals/get-iterator-method":95}],97:[function(require,module,exports){
(function (global){
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],98:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],99:[function(require,module,exports){
module.exports = {};

},{}],100:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');

module.exports = getBuiltIn('document', 'documentElement');

},{"../internals/get-built-in":94}],101:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":84,"../internals/document-create-element":85,"../internals/fails":92}],102:[function(require,module,exports){
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

},{"../internals/classof-raw":75,"../internals/fails":92}],103:[function(require,module,exports){
var store = require('../internals/shared-store');

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/shared-store":134}],104:[function(require,module,exports){
var NATIVE_WEAK_MAP = require('../internals/native-weak-map');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var objectHas = require('../internals/has');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

},{"../internals/create-non-enumerable-property":79,"../internals/global":97,"../internals/has":98,"../internals/hidden-keys":99,"../internals/is-object":109,"../internals/native-weak-map":114,"../internals/shared-key":133}],105:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

},{"../internals/iterators":112,"../internals/well-known-symbol":147}],106:[function(require,module,exports){
var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

},{"../internals/classof-raw":75}],107:[function(require,module,exports){
var fails = require('../internals/fails');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":92}],108:[function(require,module,exports){
var classof = require('../internals/classof');
var wellKnownSymbol = require('../internals/well-known-symbol');
var Iterators = require('../internals/iterators');

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"../internals/classof":76,"../internals/iterators":112,"../internals/well-known-symbol":147}],109:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],110:[function(require,module,exports){
module.exports = true;

},{}],111:[function(require,module,exports){
'use strict';
var getPrototypeOf = require('../internals/object-get-prototype-of');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var wellKnownSymbol = require('../internals/well-known-symbol');
var IS_PURE = require('../internals/is-pure');

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

},{"../internals/create-non-enumerable-property":79,"../internals/has":98,"../internals/is-pure":110,"../internals/object-get-prototype-of":122,"../internals/well-known-symbol":147}],112:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"dup":99}],113:[function(require,module,exports){
var fails = require('../internals/fails');

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

},{"../internals/fails":92}],114:[function(require,module,exports){
var global = require('../internals/global');
var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

},{"../internals/global":97,"../internals/inspect-source":103}],115:[function(require,module,exports){
var anObject = require('../internals/an-object');
var defineProperties = require('../internals/object-define-properties');
var enumBugKeys = require('../internals/enum-bug-keys');
var hiddenKeys = require('../internals/hidden-keys');
var html = require('../internals/html');
var documentCreateElement = require('../internals/document-create-element');
var sharedKey = require('../internals/shared-key');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

},{"../internals/an-object":64,"../internals/document-create-element":85,"../internals/enum-bug-keys":90,"../internals/hidden-keys":99,"../internals/html":100,"../internals/object-define-properties":116,"../internals/shared-key":133}],116:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var anObject = require('../internals/an-object');
var objectKeys = require('../internals/object-keys');

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};

},{"../internals/an-object":64,"../internals/descriptors":84,"../internals/object-define-property":117,"../internals/object-keys":124}],117:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/an-object":64,"../internals/descriptors":84,"../internals/ie8-dom-define":101,"../internals/to-primitive":142}],118:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var has = require('../internals/has');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

},{"../internals/create-property-descriptor":80,"../internals/descriptors":84,"../internals/has":98,"../internals/ie8-dom-define":101,"../internals/object-property-is-enumerable":125,"../internals/to-indexed-object":138,"../internals/to-primitive":142}],119:[function(require,module,exports){
var toIndexedObject = require('../internals/to-indexed-object');
var nativeGetOwnPropertyNames = require('../internals/object-get-own-property-names').f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};

},{"../internals/object-get-own-property-names":120,"../internals/to-indexed-object":138}],120:[function(require,module,exports){
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/enum-bug-keys":90,"../internals/object-keys-internal":123}],121:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],122:[function(require,module,exports){
var has = require('../internals/has');
var toObject = require('../internals/to-object');
var sharedKey = require('../internals/shared-key');
var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter');

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

},{"../internals/correct-prototype-getter":77,"../internals/has":98,"../internals/shared-key":133,"../internals/to-object":141}],123:[function(require,module,exports){
var has = require('../internals/has');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

},{"../internals/array-includes":67,"../internals/has":98,"../internals/hidden-keys":99,"../internals/to-indexed-object":138}],124:[function(require,module,exports){
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

},{"../internals/enum-bug-keys":90,"../internals/object-keys-internal":123}],125:[function(require,module,exports){
'use strict';
var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

},{}],126:[function(require,module,exports){
var anObject = require('../internals/an-object');
var aPossiblePrototype = require('../internals/a-possible-prototype');

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

},{"../internals/a-possible-prototype":62,"../internals/an-object":64}],127:[function(require,module,exports){
'use strict';
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var classof = require('../internals/classof');

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

},{"../internals/classof":76,"../internals/to-string-tag-support":143}],128:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"dup":99}],129:[function(require,module,exports){
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
};

},{"../internals/create-non-enumerable-property":79}],130:[function(require,module,exports){
// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],131:[function(require,module,exports){
var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};

},{"../internals/create-non-enumerable-property":79,"../internals/global":97}],132:[function(require,module,exports){
var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var defineProperty = require('../internals/object-define-property').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var toString = require('../internals/object-to-string');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!has(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty(target, 'toString', toString);
    }
  }
};

},{"../internals/create-non-enumerable-property":79,"../internals/has":98,"../internals/object-define-property":117,"../internals/object-to-string":127,"../internals/to-string-tag-support":143,"../internals/well-known-symbol":147}],133:[function(require,module,exports){
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":135,"../internals/uid":144}],134:[function(require,module,exports){
var global = require('../internals/global');
var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;

},{"../internals/global":97,"../internals/set-global":131}],135:[function(require,module,exports){
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":110,"../internals/shared-store":134}],136:[function(require,module,exports){
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

},{"../internals/require-object-coercible":130,"../internals/to-integer":139}],137:[function(require,module,exports){
var toInteger = require('../internals/to-integer');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer":139}],138:[function(require,module,exports){
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":102,"../internals/require-object-coercible":130}],139:[function(require,module,exports){
var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],140:[function(require,module,exports){
var toInteger = require('../internals/to-integer');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":139}],141:[function(require,module,exports){
var requireObjectCoercible = require('../internals/require-object-coercible');

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":130}],142:[function(require,module,exports){
var isObject = require('../internals/is-object');

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"../internals/is-object":109}],143:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';

},{"../internals/well-known-symbol":147}],144:[function(require,module,exports){
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],145:[function(require,module,exports){
var NATIVE_SYMBOL = require('../internals/native-symbol');

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":113}],146:[function(require,module,exports){
var wellKnownSymbol = require('../internals/well-known-symbol');

exports.f = wellKnownSymbol;

},{"../internals/well-known-symbol":147}],147:[function(require,module,exports){
var global = require('../internals/global');
var shared = require('../internals/shared');
var has = require('../internals/has');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

},{"../internals/global":97,"../internals/has":98,"../internals/native-symbol":113,"../internals/shared":135,"../internals/uid":144,"../internals/use-symbol-as-uid":145}],148:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var fails = require('../internals/fails');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var createProperty = require('../internals/create-property');
var arraySpeciesCreate = require('../internals/array-species-create');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/engine-v8-version');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

},{"../internals/array-method-has-species-support":69,"../internals/array-species-create":72,"../internals/create-property":81,"../internals/engine-v8-version":88,"../internals/export":91,"../internals/fails":92,"../internals/is-array":106,"../internals/is-object":109,"../internals/to-length":140,"../internals/to-object":141,"../internals/well-known-symbol":147}],149:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var forEach = require('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});

},{"../internals/array-for-each":65,"../internals/export":91}],150:[function(require,module,exports){
var $ = require('../internals/export');
var from = require('../internals/array-from');
var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration');

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});

},{"../internals/array-from":66,"../internals/check-correctness-of-iteration":74,"../internals/export":91}],151:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var $indexOf = require('../internals/array-includes').indexOf;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/array-includes":67,"../internals/array-method-is-strict":70,"../internals/array-method-uses-to-length":71,"../internals/export":91}],152:[function(require,module,exports){
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});

},{"../internals/export":91,"../internals/is-array":106}],153:[function(require,module,exports){
'use strict';
var toIndexedObject = require('../internals/to-indexed-object');
var addToUnscopables = require('../internals/add-to-unscopables');
var Iterators = require('../internals/iterators');
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"../internals/add-to-unscopables":63,"../internals/define-iterator":82,"../internals/internal-state":104,"../internals/iterators":112,"../internals/to-indexed-object":138}],154:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var $map = require('../internals/array-iteration').map;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/array-iteration":68,"../internals/array-method-has-species-support":69,"../internals/array-method-uses-to-length":71,"../internals/export":91}],155:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var isArray = require('../internals/is-array');

var nativeReverse = [].reverse;
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});

},{"../internals/export":91,"../internals/is-array":106}],156:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var toAbsoluteIndex = require('../internals/to-absolute-index');
var toLength = require('../internals/to-length');
var toIndexedObject = require('../internals/to-indexed-object');
var createProperty = require('../internals/create-property');
var wellKnownSymbol = require('../internals/well-known-symbol');
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

},{"../internals/array-method-has-species-support":69,"../internals/array-method-uses-to-length":71,"../internals/create-property":81,"../internals/export":91,"../internals/is-array":106,"../internals/is-object":109,"../internals/to-absolute-index":137,"../internals/to-indexed-object":138,"../internals/to-length":140,"../internals/well-known-symbol":147}],157:[function(require,module,exports){
var $ = require('../internals/export');

// `Date.now` method
// https://tc39.github.io/ecma262/#sec-date.now
$({ target: 'Date', stat: true }, {
  now: function now() {
    return new Date().getTime();
  }
});

},{"../internals/export":91}],158:[function(require,module,exports){
var global = require('../internals/global');
var setToStringTag = require('../internals/set-to-string-tag');

// JSON[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-json-@@tostringtag
setToStringTag(global.JSON, 'JSON', true);

},{"../internals/global":97,"../internals/set-to-string-tag":132}],159:[function(require,module,exports){
var setToStringTag = require('../internals/set-to-string-tag');

// Math[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-math-@@tostringtag
setToStringTag(Math, 'Math', true);

},{"../internals/set-to-string-tag":132}],160:[function(require,module,exports){
var $ = require('../internals/export');
var DESCRIPTORS = require('../internals/descriptors');
var objectDefinePropertyModile = require('../internals/object-define-property');

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});

},{"../internals/descriptors":84,"../internals/export":91,"../internals/object-define-property":117}],161:[function(require,module,exports){
// empty

},{}],162:[function(require,module,exports){
'use strict';
var charAt = require('../internals/string-multibyte').charAt;
var InternalStateModule = require('../internals/internal-state');
var defineIterator = require('../internals/define-iterator');

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

},{"../internals/define-iterator":82,"../internals/internal-state":104,"../internals/string-multibyte":136}],163:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.asyncIterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');

},{"../internals/define-well-known-symbol":83}],164:[function(require,module,exports){
arguments[4][161][0].apply(exports,arguments)
},{"dup":161}],165:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.hasInstance` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol('hasInstance');

},{"../internals/define-well-known-symbol":83}],166:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol('isConcatSpreadable');

},{"../internals/define-well-known-symbol":83}],167:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

},{"../internals/define-well-known-symbol":83}],168:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var global = require('../internals/global');
var getBuiltIn = require('../internals/get-built-in');
var IS_PURE = require('../internals/is-pure');
var DESCRIPTORS = require('../internals/descriptors');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');
var fails = require('../internals/fails');
var has = require('../internals/has');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var nativeObjectCreate = require('../internals/object-create');
var objectKeys = require('../internals/object-keys');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertyNamesExternal = require('../internals/object-get-own-property-names-external');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var shared = require('../internals/shared');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');
var uid = require('../internals/uid');
var wellKnownSymbol = require('../internals/well-known-symbol');
var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped');
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');
var setToStringTag = require('../internals/set-to-string-tag');
var InternalStateModule = require('../internals/internal-state');
var $forEach = require('../internals/array-iteration').forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

},{"../internals/an-object":64,"../internals/array-iteration":68,"../internals/create-non-enumerable-property":79,"../internals/create-property-descriptor":80,"../internals/define-well-known-symbol":83,"../internals/descriptors":84,"../internals/export":91,"../internals/fails":92,"../internals/get-built-in":94,"../internals/global":97,"../internals/has":98,"../internals/hidden-keys":99,"../internals/internal-state":104,"../internals/is-array":106,"../internals/is-object":109,"../internals/is-pure":110,"../internals/native-symbol":113,"../internals/object-create":115,"../internals/object-define-property":117,"../internals/object-get-own-property-descriptor":118,"../internals/object-get-own-property-names":120,"../internals/object-get-own-property-names-external":119,"../internals/object-get-own-property-symbols":121,"../internals/object-keys":124,"../internals/object-property-is-enumerable":125,"../internals/redefine":129,"../internals/set-to-string-tag":132,"../internals/shared":135,"../internals/shared-key":133,"../internals/to-indexed-object":138,"../internals/to-object":141,"../internals/to-primitive":142,"../internals/uid":144,"../internals/use-symbol-as-uid":145,"../internals/well-known-symbol":147,"../internals/well-known-symbol-wrapped":146}],169:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.matchAll` well-known symbol
defineWellKnownSymbol('matchAll');

},{"../internals/define-well-known-symbol":83}],170:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.match` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.match
defineWellKnownSymbol('match');

},{"../internals/define-well-known-symbol":83}],171:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.replace` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.replace
defineWellKnownSymbol('replace');

},{"../internals/define-well-known-symbol":83}],172:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.search` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.search
defineWellKnownSymbol('search');

},{"../internals/define-well-known-symbol":83}],173:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.species` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.species
defineWellKnownSymbol('species');

},{"../internals/define-well-known-symbol":83}],174:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.split` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.split
defineWellKnownSymbol('split');

},{"../internals/define-well-known-symbol":83}],175:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.toPrimitive` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');

},{"../internals/define-well-known-symbol":83}],176:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.toStringTag` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

},{"../internals/define-well-known-symbol":83}],177:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.unscopables` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol('unscopables');

},{"../internals/define-well-known-symbol":83}],178:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.asyncDispose` well-known symbol
// https://github.com/tc39/proposal-using-statement
defineWellKnownSymbol('asyncDispose');

},{"../internals/define-well-known-symbol":83}],179:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.dispose` well-known symbol
// https://github.com/tc39/proposal-using-statement
defineWellKnownSymbol('dispose');

},{"../internals/define-well-known-symbol":83}],180:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.observable` well-known symbol
// https://github.com/tc39/proposal-observable
defineWellKnownSymbol('observable');

},{"../internals/define-well-known-symbol":83}],181:[function(require,module,exports){
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

// `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('patternMatch');

},{"../internals/define-well-known-symbol":83}],182:[function(require,module,exports){
// TODO: remove from `core-js@4`
var defineWellKnownSymbol = require('../internals/define-well-known-symbol');

defineWellKnownSymbol('replaceAll');

},{"../internals/define-well-known-symbol":83}],183:[function(require,module,exports){
require('./es.array.iterator');
var DOMIterables = require('../internals/dom-iterables');
var global = require('../internals/global');
var classof = require('../internals/classof');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var Iterators = require('../internals/iterators');
var wellKnownSymbol = require('../internals/well-known-symbol');

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  Iterators[COLLECTION_NAME] = Iterators.Array;
}

},{"../internals/classof":76,"../internals/create-non-enumerable-property":79,"../internals/dom-iterables":86,"../internals/global":97,"../internals/iterators":112,"../internals/well-known-symbol":147,"./es.array.iterator":153}],184:[function(require,module,exports){
var $ = require('../internals/export');
var global = require('../internals/global');
var userAgent = require('../internals/engine-user-agent');

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});

},{"../internals/engine-user-agent":87,"../internals/export":91,"../internals/global":97}],185:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"../../es/array/is-array":39,"dup":55}],186:[function(require,module,exports){
var parent = require('../../../es/array/virtual/for-each');

module.exports = parent;

},{"../../../es/array/virtual/for-each":41}],187:[function(require,module,exports){
var parent = require('../../es/date/now');

module.exports = parent;

},{"../../es/date/now":46}],188:[function(require,module,exports){
var parent = require('../../es/instance/concat');

module.exports = parent;

},{"../../es/instance/concat":47}],189:[function(require,module,exports){
require('../../modules/web.dom-collections.iterator');
var forEach = require('../array/virtual/for-each');
var classof = require('../../internals/classof');
var ArrayPrototype = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

module.exports = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.forEach)
    // eslint-disable-next-line no-prototype-builtins
    || DOMIterables.hasOwnProperty(classof(it)) ? forEach : own;
};

},{"../../internals/classof":76,"../../modules/web.dom-collections.iterator":183,"../array/virtual/for-each":186}],190:[function(require,module,exports){
var parent = require('../../es/instance/index-of');

module.exports = parent;

},{"../../es/instance/index-of":48}],191:[function(require,module,exports){
var parent = require('../../es/instance/map');

module.exports = parent;

},{"../../es/instance/map":49}],192:[function(require,module,exports){
var parent = require('../../es/instance/reverse');

module.exports = parent;

},{"../../es/instance/reverse":50}],193:[function(require,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"../../es/instance/slice":51,"dup":57}],194:[function(require,module,exports){
arguments[4][59][0].apply(exports,arguments)
},{"../../es/object/define-property":52,"dup":59}],195:[function(require,module,exports){
require('../modules/web.timers');
var path = require('../internals/path');

module.exports = path.setTimeout;

},{"../internals/path":128,"../modules/web.timers":184}]},{},[6])(6)
});
