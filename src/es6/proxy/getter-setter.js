"use strict";

// proxy比标准的getter和setting更容易，更透明。同时对于多个属性不需要重复写getter和setting
/**
 * 通过闭包实现getter和setter保护私有属性
 */
function Ninja() {
  // 定义私有属性变量
  let skillLevel;
  // getter
  this.getSkillLevel = function () {
    return skillLevel;
  };
  //  setter
  this.setSkillLevel = function (value) {
    skillLevel = value;
  };
}

// const ninja = new Ninja();
// const ninja2 = new Ninja();
// ninja.setSkillLevel(100);
// ninja2.setSkillLevel(50);
// console.log(ninja.getSkillLevel()); // 100
// console.log(ninja2.getSkillLevel()); // 50

/**
 * 通过对象字面量定义getter和setter
 */
const ninjaCollection = {
  ninjas: ["Yoshi", "Kuma", "Hattori"],
  get firstNinja() {
    console.log("Getting firstNinja");
    return this.ninjas[0];
  },
  set firstNinja(value) {
    console.log("Setting firstNinja");
    this.ninjas[0] = value;
  },
  // 相同属性。后定义的会覆盖先定义的，这个时候ninjaCollection.firstNinja->cover
  // firstNinja: "cover",
};

// console.log(ninjaCollection.firstNinja);
// ninjaCollection.firstNinja = "Hachi";
// console.log(ninjaCollection.firstNinja);

/**
 * class中使用getter和setter
 */
class NinjaCollection {
  constructor() {
    this.ninjas = ["Yoshi", "Kuma", "Hattori"];
  }
  get firstNinja() {
    console.log("Getting firstNinja");
    return this.ninjas[0];
  }
  set firstNinja(value) {
    console.log("Setting firstNinja");
    this.ninjas[0] = value;
  }
}

// const n = new NinjaCollection();
// n.firstNinja;
// n.firstNinja = "Hachi";

/**
 * 通过Object.defineProperty定义getter和setter
 */

function Ninja3() {
  let _skillLevel = 0;

  Object.defineProperty(this, "skillLevel", {
    get: () => {
      console.log("get _skillLevel");
      return _skillLevel;
    },
    set: (value) => {
      if (!Number.isInteger(value)) {
        throw new TypeError("Skill level should be a number");
      }
      _skillLevel = value;
    },
  });
}

const ninja3 = new Ninja3();
ninja3.skillLevel;
