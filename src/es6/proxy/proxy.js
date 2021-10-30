"use strict";

/**
 *  建议谨慎使用代理。尽管使用代理可以创造性地控制对象的访问，但是大量的控制操作将带来性能问题
 */


const emperor = { name: "Komei" };

const representative = new Proxy(emperor, {
  get: (target, key) => {
    return key in target ? target[key] : "Don't bother the emperor";
  },
  set: (target, key, value) => {
    target[key] = value;
  },
});

// console.log(representative.name); // Komei
// console.log(representative.age); // Don't bother the emperor

/**
 * 使用代理记录日志
 */

function makeLoggable(target) {
  return new Proxy(target, {
    get: (target, property) => {
      console.log("Reading " + property);
      return target[property];
    },
    set: (target, property, value) => {
      console.log(`Writing value ${value} to ${property}`);
      target[property] = value;
    },
  });
}

// let ninja = { name: "Yoshi" };

// ninja = makeLoggable(ninja);

// ninja.name;

/**
 * 用代理检测函数性能
 */
function isPrime(number) {
  if (number < 2) {
    return false;
  }
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

// console.log(isPrime(122222222));

isPrime = new Proxy(isPrime, {
  apply: (target, thisArg, args) => {
    console.log("thisArg->", thisArg);
    console.time("isPrime");

    const result = target.apply(thisArg, args);
    console.timeEnd("isPrime");
    return result;
  },
});

// console.log(isPrime(122222222));
