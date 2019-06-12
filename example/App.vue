<template>
  <div>
    <ele-upload-image
      :crop="true"
      :crop-height="200"
      :crop-width="200"
      :multiple="false"
      @success="handleSuccess"
      action="https://jsonplaceholder.typicode.com/posts/"
      v-model="images"
    />
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
