export default class Menu {
  constructor({
    container,
    backgroundColor = "#000000",
    color = "#ffffff",
    menu = [],
  }) {
    this.container = container;
    this.backgroundColor = backgroundColor;
    this.color = color;
    this.menu = menu;
    this.paddingLR = 10;
    this.element = null;
    this.menuItemElements = [];
    this._position = { x: 0, y: 0 };
    this.element = this.createElement();
    container.appendChild(this.element);
  }
  set position({ x, y }) {
    this._position = { x, y };
    this.moveTo(x, y);
  }
  moveTo = (x_center, y_top) => {
    this.show(); // 要先显示一下 否则getBoundingClientRect拿不到
    const elementWidth = this.element.getBoundingClientRect().width;
    const elementHeight = this.element.getBoundingClientRect().height;
    this.hide(); // 之后还是交给外面处理
    // container相对位置
    const containerScreenOffset = this.container.getBoundingClientRect();
    // element 左上角坐标, 相对于container
    let x = x_center;
    let y = y_top;

    // 屏幕宽度
    const winWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    // 弹窗距离左右边界的距离哦
    // 文档滚动的距离
    // const scrollWidth =
    //   document.body.scrollLeft || document.documentElement.scrollLeft;

    // 判断x边界值，防止菜单栏溢出左右可视窗口
    if (
      x_center + containerScreenOffset.left <
      elementWidth / 2 + this.paddingLR
    ) {
      // 左边
      x = this.paddingLR - containerScreenOffset.left;
    } else if (
      x_center + containerScreenOffset.left >
      winWidth - elementWidth / 2 - this.paddingLR
    ) {
      // 右边
      x = winWidth - elementWidth - containerScreenOffset.left - this.paddingLR;
    } else {
      // 中间
      x = x_center - elementWidth / 2;
    }

    // 弹窗距离上下边界的距离哦
    const containerFontSize = Number(
      window.getComputedStyle(this.container).fontSize.replace("px", "")
    );
    const elementTopOffset = containerFontSize * 1.5; // 文字与弹窗之间的距离
    // 文档滚动的距离
    // const scrollHeight =
    //   document.body.scrollTop || document.documentElement.scrollTop;

    // 判断y边界值，防止菜单栏溢出上下可视窗口
    if (y_top + containerScreenOffset.top < elementTopOffset + elementHeight) {
      // 上边
      y = y_top + elementTopOffset * 2.5; // 怕挡住游标
    } else {
      //中间
      y = y_top - elementHeight - elementTopOffset;
    }
    // 显示弹窗
    this.element.style.top = `${y}px`;
    this.element.style.left = `${x}px`;
  };
  show = () => {
    this.element.style.display = "block";
  };
  hide = () => {
    this.element.style.display = "none";
  };
  createElement = () => {
    const element = document.createElement("div");
    element.classList.add(
      "mobile-text-selection-tools",
      "mobile-text-selection-tools-menu"
    );
    element.style.userSelect = "none";
    element.style.webkitUserSelect = "none";
    element.style.display = "none";
    element.style.position = "absolute";
    element.style.left = "0px";
    element.style.top = "0px";
    element.style.zIndex = "3";
    element.style.borderRadius = "4px";
    element.style.overflow = "hidden";
    element.style.boxShadow = "0px 1px 2px 1px #666";
    // 屏幕宽度
    const winWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    element.style.maxWidth = `${winWidth - 2 * this.paddingLR}px`;

    const menuWrapper = document.createElement("div");
    menuWrapper.style.overflow = "scroll";

    const menuList = document.createElement("div");
    menuList.style.display = "flex";
    menuList.style.alignItems = "center";
    menuList.style.width = "max-content";

    this.menu.map((item) => {
      const menuItem = document.createElement("div");
      menuItem.style.display = "flex";
      menuItem.style.flex = "1 0 auto";
      menuItem.style.alignItems = "center";
      menuItem.style.padding = "10px 15px";
      menuItem.style.boxSizing = "border-box";
      menuItem.style.boxSizing = "border-box";
      menuItem.style.backgroundColor = this.backgroundColor;
      if (!item.key) {
        throw new Error("菜单项需要参数key");
      }
      menuItem.dataset.key = item.key;
      if (item.icon) {
        const icon = document.createElement("div");
        icon.style.display = "flex";
        icon.style.alignItems = "center";
        icon.style.justifyContent = "center";
        icon.style.marginRight = "5px";
        icon.style.maxWidth = "1.2em";
        icon.style.maxHeight = "1.2em";
        icon.appendChild(item.icon);
        menuItem.appendChild(icon);
        const iconImg = icon.querySelector("img");
        if (iconImg) {
          iconImg.style.width = "100%";
          iconImg.style.height = "100%";
        }
      }
      if (item.text) {
        const text = document.createElement("span");
        text.style.color = this.color;
        text.innerText = item.text;
        menuItem.appendChild(text);
      }
      if (item.click) {
        if (typeof item.click !== "function") {
          throw Error("参数click类型错误");
        }
        menuItem.onclick = () => item.click(item.key);
      }
      this.menuItemElements.push(menuItem);
      menuList.appendChild(menuItem);
    });
    menuWrapper.appendChild(menuList);
    element.appendChild(menuWrapper);
    return element;
  };
  getSelectMenuKey(path) {
    const selectMenuItem = this.menuItemElements.find((item) => {
      return path.indexOf(item) > -1;
    });
    return selectMenuItem && selectMenuItem.dataset.key;
  }
  clickMenuItem(key, params) {
    const menuItem = this.menu.find((item) => item.key === key);
    menuItem.click && menuItem.click(params);
  }
}
