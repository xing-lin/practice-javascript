### 小技巧

1. 一排菜单，激活项的字体大小为 16px，普通项字体大小为 14px。正常来说点击切换菜单的时候，由于菜单的字数不统一，切换时有抖动迹象，改为不直接改变 font-size，而是用放大来实现。

```css
transform: scale(1.15, 1.15); // 元素的占用空间依旧是那么大，但视觉效果比原先的大1.15倍
```