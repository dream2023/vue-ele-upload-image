<template>
  <div style="margin-left: 50px; margin-top: 50px">
    <h1>单张图片</h1>
    <ele-upload-image
      @change="handleSinge1Change"
      action="https://jsonplaceholder.typicode.com/posts/"
      v-model="image1"
    ></ele-upload-image>
    <h1>多张图片</h1>
    <ele-upload-image
      @change="handleMultiChange"
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      v-model="images"
    ></ele-upload-image>
    <h1>拖拽</h1>
    <ele-upload-image
      @change="handleSinge2Change"
      action="https://jsonplaceholder.typicode.com/posts/"
      drag
      v-model="image2"
    ></ele-upload-image>
    <h1>裁剪</h1>
    <ele-upload-image
      @change="handleSinge3Change"
      action="https://jsonplaceholder.typicode.com/posts/"
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
    handleMultiChange (response, file, fileList) {
      this.images.push(file.url)
    },
    handleSinge1Change (response, file) {
      this.image1 = file.url
    },
    handleSinge2Change (response, file) {
      this.image2 = file.url
    },
    handleSinge3Change (response, file) {
      this.image3 = file.url
    }
  },
  mounted () {}
}
</script>
