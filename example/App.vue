<template>
  <div>
    <ele-upload-image
      :crop="true"
      :crop-height="50"
      :crop-width="50"
      :data="{
        token: 'Nx6ehv5XlzuIhvP1mvVffM_jZbsyLErLMc4B2Gor:ND8FK5MPuKnttIvYG_4Whx7WMLU=:eyJzY29wZSI6ImxlYWd1ZSIsImRlYWRsaW5lIjoxNTYwMjYxNjk5fQ=='
      }"
      :drag="true"
      :file-type="['jpg', 'png']"
      :limit="1"
      :multiple="true"
      :size="1"
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
