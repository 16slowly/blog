# 概览

* CSS 布局
* 性能优化
* 算法/数据结构
* JS 基础/设计模式
* HTTP / Web 安全
* 项目 / 框架

## CSS 布局

### 1. BFC(块格式化上下文)

> 满足某些条件的 block 元素会在文档流中形成了一个独立的块级渲染区域，该区域遵从一套渲染规则来约束 block 元素的渲染，由此内部的子元素的布局渲染，不会影响 block 外部的元素。

** 形成 BFC 的条件： **

* 根元素，包含根元素（html）的元素;
* 浮动元素（float 的值不为 none， 默认为 none）;
* 绝对定位元素（position 的值为 absolute 或 fixed，默认值为 static）;
* 行内块元素/表格（display 的值为 inline-block, table-cell, table-caption);
* 弹性元素（display 为 flex 或 inline-flex 的直接子元素）;
* 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）;
* overflow 的值不为 visible（默认值为 auto）。

** BFC 遵循的渲染规则： **

* 内部的 box 会在垂直方向，一个接一个地放置
* box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 box 的 margin 会发生重叠。
* 对于从左往右的格式化，每个元素的 margin box 的左边，与包含块 border box 的左边相接触，存在浮动也如此。否则相反。
* BFC 的区域不会与 float box 重叠, (受浮动影响的元素，通过使其变为 BFC，可排除浮动对其的影响)
* BFC 中的子元素不会影响到外面的元素，反之外面的也影响不到 BFC 中的。
* 计算 BFC 的高度时，内部的浮动元素也参与计算。

** BFC 的运用：**

* 自适应布局：

  > 和 float 元素做相邻兄弟时, 普通流体元素与 float 元素是覆盖关系（文字环绕图片效果）；普通流体元素变成 BFC 元素后，与 float 元素是互不干扰关系，BFC 元素会顺着浮动边缘形成自己的上下文封闭空间

* 清除浮动

  1.  触发浮动元素的父元素的 BFC (父元素加上 overflow: hidden, 触发父元素的 BFC), 排除该子元素对父级元素外部元素的影响。
  2.  让浮动元素形成一个 BFC 容器，排除对相邻元素的影响

### 3. 图片自适应

> 元素垂直方向的 `margin`/`padding` 百分比值相对于元素的宽度进行计算

```js
// html
<div class="banner">
  <img src="banner.jpg" />
</div>

// css
.banner {
  padding: 15.15% 0 0;
  position: relative;
}

.banner > img {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
```

### 4. 固定宽高比布局

> 元素垂直方向的 `margin`/`padding` 百分比值相对于元素的宽度进行计算

宽高比：`4:3`

```js
// html
<div class="wrapper">
  <div class="box">
  padding设置为百分比时，是以元素的宽度乘以百分比从而得到padding值的。这刚好可以为我们所用，在div的width为固定的情况下，设置height为0，使内容自然溢出，再通过设置padding-bottom使元素有一定高度。
  </div>
</div>

// css
.wrapper {
  width: 80%;
  height: 0; // 让内容高度自动溢出
  padding-bottom: 60%;
}

.wrapper > .box {
  width: 100%;
  height: auto;
}
```

### 5. 实现三角形

```js
// html
<div class="triangle"></div>

// css
.triangle {
  width: 0;
  height: 0;
  border-top: 30px #f2f2f2 solid;
  border-left: 30px transparent solid;
  border-right: 30px transparent solid;
  border-bottom: 30px transparent solid;
}
```

### 6. flex 布局

* justify-content: 主轴方向，`flex-start`|`flex-end`|`center`|`space-between`|`space-around`
* align-items: 交叉轴，`stretch`| `flex-start` | `flex-end`| `center`|`baseline`
* align-content: 多根轴线的对齐方式，只有一根轴线时无效，`stretch` | `flex-start`|`flex-end`|`center`|`space-between`|`space-around`
* flex-direction: 布局轴向，`row` | `row-reverse` | `column` | `column-reverse`

### 7. 居中布局

* 水平居中
* 垂直居中

### 8. `margin` 重叠问题：

* 如果在父元素与其第一个子元素之间不存在 border, padding, 行内内容，也没有创建 BFC 或者清除浮动将父子的 margin-top 分开，或与其最后一个子元素之间不存在 border, padding, 行内内容，height, min-height, max-height 将两者的 margin-bottom 分开，那这两对外边距之间会产生折叠，子元素的外边距会“溢出”到父元素的外面
* 一个块级元素中不包含任何内容，并在其 margin-top 与 margin-bottom 之间没有边框，内边框，行内内容，height, min-height 将两者分开，这两个 margin 之间会折叠。
* 如果参与折叠的外边距中包含负值，折叠后的外边距的值为最大的正边距与最小的负边距（即绝对值最大的负边距）的和。
* 如果所有参与折叠的外边距都为负，折叠后的外边距的值为最小的负边距的值。

### 9. 其他问题

* Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。
* 宽/高度，字体大小等采用偶数，更容易与其他部分构成比例关系
* 使用缩放渲染出小于 12px 的文字

```js
 p {
    font-size: 10px;
    -webkit-transform: scale(0.8);
 }
```

## JS 基础 / 设计模式

### 1. 类型转换
### 2. 继承/闭包
### 3. 事件队列
### 4. 理解 call, apply, bind, this
### 5. 防抖节流
### 6. 事件委托
### 7. Promise / Object.assign 的实现，深浅拷贝
### 8. local server
### 8. setTimeout & setInterval
### 9. 函数式编程, 柯里化
### 10. 发布订阅模式
