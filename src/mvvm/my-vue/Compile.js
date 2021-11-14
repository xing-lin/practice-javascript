class Compile {
  constructor(el, vm) {
    this.el = typeof el === "string" ? document.querySelector(el) : el;
    this.vm = vm;
    // 编译模板
    if (this.el) {
      // 1. 把el中所有的子节点都放入到fragment中
      const fragment = this.nodeToFragment(this.el);
      // 2. 编译fragment
      this.compile(fragment);
      // 3. 将编译好的fragment挂载到el下
      this.el.appendChild(fragment);
    }
  }
  nodeToFragment(node) {
    // 创建一个文档碎片
    const fragment = document.createDocumentFragment();
    //
    this.toArray(node.childNodes).forEach((item) => {
      fragment.appendChild(item);
    });

    return fragment;
  }
  toArray(likeArray) {
    return [].slice.call(likeArray);
  }
  compile(fragment) {
    const childNodes = fragment.childNodes;
    this.toArray(childNodes).forEach((node) => {
      if (this.isElementNode(node)) {
        this.compileElement(node);
      }
      if (this.isTextNode(node)) {
        this.compileText(node);
      }
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }
  compileElement(node) {
    // 1. 获取node下所有的属性
    const attributes = node.attributes;
    this.toArray(attributes).forEach((attr) => {
      const nodeName = attr.nodeName;
      // 2. 解析以"v-"开头的指令
      if (this.isDirective(nodeName)) {
        const type = nodeName.slice(2);
        const expr = attr.nodeValue;

        if (this.isEventDirective(type)) {
          compileUtil["eventHandler"](node, expr, type, this.vm);
        } else {
          const dataValue = compileUtil.getVMValue(this.vm, expr);

          if (compileUtil[type]) {
            compileUtil[type](node, dataValue);
            if (type === "model") {
              const that = this;
              node.addEventListener("input", function () {
                // that.vm.$data[expr] = this.value;
                compileUtil.setVMValue(that.vm, expr, this.value);
              });
            }
            new Watch(this.vm, expr, (newValue) => {
              compileUtil[type](node, newValue);
            });
          }
        }
      }
    });
  }
  compileText(node) {
    const txt = node.textContent;
    const reg = /\{\{(.+)\}\}/;
    if (reg.test(txt)) {
      const expr = RegExp.$1;
      node.textContent = txt.replace(
        reg,
        compileUtil.getVMValue(this.vm, expr)
      );
      new Watch(this.vm, expr, (newValue) => {
        node.textContent = txt.replace(reg, newValue);
      });
    }
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  isTextNode(node) {
    return node.nodeType === 3;
  }
  isDirective(name) {
    return name.startsWith("v-");
  }
  isEventDirective(type) {
    return type.split(":")[0] === "on";
  }
}

const compileUtil = {
  text(node, value) {
    node.textContent = value;
  },
  html(node, value) {
    node.innerHTML = value;
  },
  model(node, value) {
    node.value = value;
  },
  eventHandler(node, value, type, vm) {
    const eventType = type.split(":")[1];
    const fn = vm.$methods && vm.$methods[value];

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm));
    }
  },
  getVMValue(vm, expr) {
    let data = vm.$data;
    expr.split(".").forEach((key) => {
      data = data[key];
    });
    return data;
  },
  // v-model，输入框如果改变的是一个对象的值
  setVMValue(vm, expr, value) {
    let data = vm.$data;
    const arr = expr.split(".");
    arr.forEach((key, index) => {
      if (index < arr.length - 1) {
        data = data[key];
      } else {
        data[key] = value;
      }
    });
  },
};
