# 基于 element-ui 的简单且强大的图片上传组件

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![npm](https://img.shields.io/npm/v/vue-ele-upload-image.svg)](https://www.npmjs.com/package/vue-ele-upload-image)
[![size](https://img.shields.io/bundlephobia/minzip/vue-ele-upload-image.svg)](https://www.npmjs.com/package/vue-ele-upload-image)
[![download](https://img.shields.io/npm/dw/vue-ele-upload-image.svg)](https://npmcharts.com/compare/vue-ele-upload-image?minimal=true)

## 介绍

vue-ele-upload-image 通过对 element-ui 的 upload 组件进一步封装, 使得图片上传更加容易, 具体特点如下:

- 简单: 一个参数即可支持单张图片模式/多张图片模式/拖拽上传/裁剪上传
- 实用: 普通模式/拖拽模式/裁剪模式图片列表表现形式一样
- 未阉割原 upload 组件功能

## 效果图

![效果图](./public/example.gif)

## 在线示例

[https://codepen.io/dream2023/pen/pXvxqP/](https://codepen.io/dream2023/pen/pXvxqP/)

## 安装

```bash
npm install vue-ele-upload-image --save
```

## 使用

```js
// 全局引入
import EleUploadImage from 'vue-ele-upload-image'
Vue.component(EleUploadImage.name, EleUploadImage)
```

```js
// 局部引入
import EleUploadImage from 'vue-ele-upload-image'
export default {
  components: {
    EleUploadImage
  }
}
```

## 示例

```html
<!-- 默认(单张, 点击上传) -->
<template>
  <ele-upload-image
    action="https://jsonplaceholder.typicode.com/posts/"
    v-model="image"
    @success="handleSuccess"
  ></ele-upload-image>
</template>
<script>
  export default {
    data() {
      return {
        image: ''
      }
    },
    methods: {
      handleSuccess(response, file) {
        // 根据响应结果, 设置 URL
        this.image = 'https://xxx.xxx.com/image/' + response.id
      }
    }
  }
</script>
```

```html
<template>
  <!-- 多张(multiple) -->
  <ele-upload-image
    multiple
    @success="handleSuccess"
    action="https://jsonplaceholder.typicode.com/posts/"
    v-model="images"
  ></ele-upload-image>
</template>

<script>
  export default {
    data() {
      return {
        images: ''
      }
    },
    methods: {
      handleSuccess(response, file, fileList) {
        // 根据响应结果, 设置 URL
        this.images.push('https://xxx.xxx.com/image/' + response.id)
      }
    }
  }
</script>
```

```html
<!-- 拖拽上传(drag) -->
<ele-upload-image
  drag
  @success="handleSuccess"
  action="https://jsonplaceholder.typicode.com/posts/"
  v-model="image"
></ele-upload-image>
```

```html
<!-- 拖拽上传(crop) -->
<ele-upload-image
  crop
  @success="handleSuccess"
  action="https://jsonplaceholder.typicode.com/posts/"
  v-model="image"
></ele-upload-image>
```

## Props 参数

```js
props: {
  // 值
  value: {
    type: [String, Array, Object]
  },
  // 是否剪裁
  crop: {
    type: Boolean,
    default: false
  },
  // 裁剪高度
  cropHeight: {
    type: Number
  },
  // 裁剪宽度
  cropWidth: {
    type: Number
  },
  // 图片显示大小
  size: {
    type: Number,
    default: 150
  },
  // 大小限制(MB), 默认5MB
  fileSize: {
    type: Number,
    default: 5
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: Array
  },
  // 缩略图后缀, 例如七牛云缩略图样式 (?imageView2/1/w/20/h/20)
  // 如果存在, 则列表显示是加缩略图后缀的, 弹窗不带缩略图后缀
  thumbSuffix: {
    type: String,
    default: ''
  },
  // 上传地址 (同官网)
  action: {
    type: String,
    required: true
  },
  // 设置上传的请求头部(同官网)
  headers: Object,
  // 文件个数显示(同官网)
  limit: Number,
  // 是否启用拖拽上传 (同官网)
  drag: {
    type: Boolean,
    default: false
  },
  // 	支持发送 cookie 凭证信息 (同官网)
  withCredentials: {
    type: Boolean,
    default: false
  },
  // 是否支持多选文件 (同官网)
  multiple: {
    type: Boolean,
    default: false
  },
  // 上传时附带的额外参数(同官网)
  data: Object,
  // 上传的文件字段名 (同官网)
  name: {
    type: String,
    default: 'file'
  },
  // 覆盖默认的上传行为，可以自定义上传的实现 (同官网)
  httpRequest: Function,
  // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）(同官网)
  accept: String
}
```

## 事件

| 事件名  | 说明       |
| ------- | ---------- |
| success | 上传成功时 |
| error   | 上传失败   |
