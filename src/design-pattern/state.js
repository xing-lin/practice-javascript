/**
 * 状态模式：关键是把事物的每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部
 */

`
class Light {
    constructor() {
      this.state = "off";
      this.button = null;
    }
    init() {
      const btn = document.createElement("button"),
        self = this;
      btn.innerHTML = "开关";
      this.button = document.body.appendChild(btn);
      this.button.onclick = function () {
        self.buttonWasPressed();
      };
    }
    buttonWasPressed() {
      if (this.state === "off") {
        console.log("开灯");
        this.state = "on";
      } else if (this.state === "on") {
        console.log("关灯");
        this.state = "off";
      }
    } 
  }

  const light = new Light();
  light.init();
`;

`
class OffLightState {
  constructor(light) {
    this.light = light;
  }
  buttonWasPressed() {
    console.log("弱光");
    this.light.setState(this.light.weakLightState);
  }
}

class WeakLightState {
  constructor(light) {
    this.light = light;
  }
  buttonWasPressed() {
    console.log("强光");
    this.light.setState(this.light.strongLightState);
  }
}

class StrongLightState {
  constructor(light) {
    this.light = light;
  }
  buttonWasPressed() {
    console.log("关灯");
    this.light.setState(this.light.offLightState);
  }
}

class Light {
  constructor() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
  }
  init() {
    var button = document.createElement("button"),
      self = this;
    this.button = document.body.appendChild(button);
    this.button.innerHTML = "开关";
    this.currState = this.offLightState; // 设置当前状态
    this.button.onclick = function () {
      self.currState.buttonWasPressed();
    };
  }
  setState(newState) {
    this.currState = newState;
  }
}
const light = new Light();
light.init();
`;
