/**
 * 适配器模式的作用是解决两个软件实体间的接口不兼容的问题。
 * 它不考虑这些接口是怎样实现的，也不考虑它们将来可能会如何演化。
 * 适配器模式不需要改变已有的接口，就能够使它们协同作用。
 */

// 现实中的适配器：港式插头转换器、电源适配器、USB转接口

const googleMap = {
  show: function () {
    console.log("开始渲染谷歌地图");
  },
};

// 假设baiduMap提供的显示地图的方法改为display
// 为了让baiduMap能够继续适应renderMap，定义一个转换器baiduMapAdapter来转换，使其能正常调用。
const baiduMap = {
  //   show: function () {
  //     console.log("开始渲染百度地图");
  //   },
  display: function () {
    console.log("开始渲染百度地图");
  },
};

const baiduMapAdapter = {
  show: function () {
    return baiduMap.display();
  },
};

const renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
};

renderMap(googleMap);
// renderMap(baiduMap);
renderMap(baiduMapAdapter);
