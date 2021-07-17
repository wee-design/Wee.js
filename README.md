# Wee.js
A Useful Wee-Design JavaScript components

这是一个小巧灵活的JavaScript组件，灵感以及部分代码来源于`Kico Style`

## 目前已经实现的功能

- 提醒弹窗功能
- 选择对象功能
- 批量处理功能
- 创建多属性元素功能
- Ajax请求功能
- 平滑移动功能

## TODO

- [ ] Ajax请求从`XMLHttpRequest`转向`fetch API`
- [ ] 实现图片灯箱
- [ ] 使用TypeScript重写（~~多此一举~~）

## 引入`Wee.js`

### CDN引入

1. 请在 body 标签结尾之前引用下面任一行代码

```html
<!-- 未压缩版本 -->
<script src="https://cdn.jsdelivr.net/gh/wee-design/Wee.js/src/wee.js"></script>
<!-- 压缩版本 -->
<script src="https://cdn.jsdelivr.net/gh/wee-design/Wee.js/src/wee.min.js"></script>
```

### 本地引入

1. 下载/src/wee.js或/src/wee.min.js
2. wee.js是没有经过压缩的版本，min已经压缩了
3. 请在 body 标签结尾之前引用下面任一行代码

```html
<!-- 未压缩版本 -->
<script src="wee.js"></script>
<!-- 压缩版本 -->
<script src="wee.min.js"></script>
```

## 调用`Wee.js`

`Wee.js`有两种调用方法，其实只是大小写同样而已哈哈

```js
// 两者等价
wee.fn()
Wee.fn()
```

在下文我将会使用`wee.fn()`的写法进行说明

### 提醒弹窗

函数原型：

```js
wee.notice(content, attr)
// For Example
wee.notice("This is A Notice in Wee.js", {
    color: 'black', //black,yello,blue,green
    time: 3000, //(ms)
})
```

参数分别为：

- `content`，必选，String类型
- `attr`，选填
  - attr{color}，String类型，颜色，black,yello,blue,green
  - attr{time}，number类型，持续时间，单位为ms，若不设置，则会出现一个叉叉给用户关闭