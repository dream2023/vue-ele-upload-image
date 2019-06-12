<template>
  <div style="margin-left: 50px; margin-top: 50px">
    <h1>单张图片</h1>
    <ele-upload-image
      action="https://jsonplaceholder.typicode.com/posts/"
      v-model="images"
    ></ele-upload-image>
    <h1>多张图片</h1>
    <ele-upload-image
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      v-model="images"
    ></ele-upload-image>
    <h1>拖拽</h1>
    <ele-upload-image
      action="https://jsonplaceholder.typicode.com/posts/"
      drag
      v-model="images"
    ></ele-upload-image>
    <h1>裁剪</h1>
    <ele-upload-image
      action="https://jsonplaceholder.typicode.com/posts/"
      crop
      v-model="images"
    ></ele-upload-image>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      images: []
    }
  },
  methods: {
    handleSuccess (file, fileList) {
      console.log(file, fileList)
    }
  },
  mounted () {}
}
</script>
