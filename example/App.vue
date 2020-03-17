<template>
  <div style="margin-left: 50px; margin-top: 50px">
    <h1>单张图片</h1>
    <ele-upload-image
      :fileSize="0.1"
      :isShowTip="false"
      :lazy="true"
      :responseFn="handleResponse"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      title="单张图片"
      v-model="image1"
    ></ele-upload-image>
    <h1>多张图片</h1>
    <ele-upload-image
      :fileSize="5"
      :responseFn="handleResponse"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76/"
      multiple
      v-model="images"
    ></ele-upload-image>
    <h1>拖拽</h1>
    <ele-upload-image
      :responseFn="handleResponse"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76/"
      drag
      v-model="image2"
    ></ele-upload-image>
    <h1>裁剪</h1>
    <ele-upload-image
      :responseFn="handleResponse"
      :size="100"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76/"
      crop
      v-model="image3"
    ></ele-upload-image>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      image1: '',
      image2: '',
      image3: '',
      images: []
    }
  },
  methods: {
    handleResponse (response, file, fileList) {
      return file.url
    }
  }
}
</script>
