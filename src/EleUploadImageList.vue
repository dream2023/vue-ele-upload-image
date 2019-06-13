<template>
  <div>
    <div class="el-upload-list el-upload-list--picture-card">
      <li
        :key="index"
        :style="{
          width: size + 'px',
          height: size + 'px'
        }"
        @keydown.delete="$emit('remove', index)"
        class="el-upload-list__item is-success"
        tabindex="0"
        v-for="(image, index) in images"
      >
        <img
          :src="image + thumbSuffix"
          class="el-upload-list__item-thumbnail"
        >
        <span class="el-upload-list__item-actions">
          <span
            @click="handleImagePreview(image)"
            class="el-upload-list__item-preview"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            @click="$emit('remove', index)"
            class="el-upload-list__item-delete"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </li>
    </div>

    <!-- 弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      append-to-body
      center
    >
      <img
        :src="dialogImageUrl"
        alt
        width="100%"
      >
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'EleUploadImageList',
  props: {
    dialogTitle: String,
    size: {
      type: Number,
      default: 150
    },
    thumbSuffix: {
      type: String,
      default: ''
    },
    images: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleImagePreview(image) {
      this.dialogVisible = true
      this.dialogImageUrl = image
    }
  }
}
</script>
