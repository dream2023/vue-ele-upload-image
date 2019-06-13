<template>
  <div class="ele-upload-image">
    <!-- 上传组件 -->
    <el-upload
      :accept="accept"
      :action="action"
      :before-upload="handleBeforeUpload"
      :data="data"
      :disabled="uploading"
      :drag="Boolean(drag)"
      :headers="headers"
      :http-request="httpRequest"
      :limit="limit"
      :list-type="drag ? 'picture' : 'picture-card'"
      :multiple="multiple"
      :name="name"
      :on-change="handleChange"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :withCredentials="withCredentials"
      ref="upload"
      style="margin-bottom: 20px;"
      v-if="!crop"
      v-show="isShowUpload"
    >
      <div v-loading="uploading">
        <!-- drag显示 -->
        <template v-if="drag">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </template>

        <!-- 非drag -->
        <template v-else>
          <i class="el-icon-plus"></i>
        </template>
      </div>

      <!-- 公共 -->
      <div
        class="el-upload__tip"
        slot="tip"
      >
        只能上传
        <b style="color: #F56C6C">{{fileType ? fileType.join('/') : '图片'}}</b>
        格式文件，且大小不超过
        <b style="color: #F56C6C">{{size}}Mb</b>
      </div>
    </el-upload>

    <div v-if="crop">
      <div
        @click="isShowCrop = true"
        class="el-upload el-upload--picture-card"
        style="margin-bottom: 20px;"
        v-show="isShowUpload"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </div>

      <cropper
        :field="name"
        :headers="headers"
        :height="cropHeight"
        :noCircle="cropHeight !== cropWidth"
        :params="data"
        :url="action"
        :width="cropWidth"
        :withCredentials="withCredentials"
        @crop-success="handleCropSuccess"
        @crop-upload-fail="handleCropUploadError"
        @crop-upload-success="handleCropUploadSuccess"
        @src-file-set="handleSetFileSet"
        class="ele-upload-image--cropper"
        img-format="png"
        ref="cropper"
        v-if="isShowCrop"
        v-model="isShowCrop"
      ></cropper>
    </div>

    <!-- 图片列表 -->
    <ele-upload-image-list
      :images="computedValues"
      @remove="handleRemove"
    />
  </div>
</template>

<script>
import EleUploadImageList from './EleUploadImageList'
import Cropper from 'vue-image-crop-upload'

export default {
  name: 'EleUploadImage',
  props: {
    // 值
    value: {
      type: [String, Array],
      default () {
        return []
      }
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
    // 大小限制(MB), 默认5MB
    size: {
      type: Number,
      default: 5
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array
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
  },
  components: {
    Cropper,
    EleUploadImageList
  },
  data () {
    return {
      cropData: {},
      isShowCrop: false,
      uploading: false,
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    computedValues () {
      if (this.value) {
        if (typeof this.value === 'string') {
          return [this.value]
        } else {
          return this.value
        }
      } else {
        return []
      }
    },
    isShowUpload () {
      if (this.multiple) {
        return true
      } else {
        return this.computedValues.length === 0
      }
    },
    successFiles () {
      return this.fileList.filter((file) => file.status === 'success')
    }
  },
  watch: {
    isShowCrop (value) {
      if (value === false) {
        this.cropData = {}
      }
    }
  },
  methods: {
    handleSetFileSet(fileName, fileType, fileSize) {
      const uid = this.cropData.uid ||  new Date().getTime()
      this.cropData = {
        name: fileName,
        percentage: 0,
        size: fileSize,
        type: fileType,
        status: 'ready',
        uid: uid
      }
    },
    handleCropSuccess (b64Data) {
      this.cropData.url = b64Data
    },
    handleCropUploadError (status) {
      this.$message.error('上传失败, 请重试')
      this.$emit('error', status)
    },
    handleCropUploadSuccess (response) {
      this.cropData.status = 'success'
      this.cropData.percentage = 100
      this.cropData.response = response
      const file = Object.assign({}, this.cropData )
      let index = this.fileList.findIndex((item) => item.uid === file.uid)
      if (index > -1) {
        this.fileList.splice(index, 1, file)
      } else {
        this.fileList.push(file)
      }
      this.handleUploadSuccess(response, file, this.fileList)
    },
    // 上传前校检格式和大小
    handleBeforeUpload (file) {
      let isImg = false
      if (this.fileType) {
        isImg = this.fileType.some((type) => file.type.indexOf(type) > -1)
      } else {
        isImg = file.type.indexOf('image') > -1
      }
      const isLt = file.size / 1024 / 1024 < this.size

      if (!isImg) {
        this.$message.error(`文件格式不正确, 请上传${this.fileType.join('/')}图片格式文件!`)
      }

      if (!isLt) {
        this.$message.error(`上传头像图片大小不能超过 ${this.size} MB!`)
      }
      this.uploading = true
      return isImg && isLt
    },
    handleChange (file, fileList) {
      this.uploading = false
      this.fileList = fileList
    },
    // 文件个数超出
    handleExceed () {
      this.$message.error(`最多上传${this.limit}张图片`)
    },
    // 上传失败
    handleUploadError (err) {
      this.uploading = false
      this.$message.error('上传失败, 请重试')
      this.$emit('error', err)
    },
    // 上传成功回调
    handleUploadSuccess (response, file) {
      this.uploading = false
      this.$message.success('上传成功')
      if (this.multiple) {
        this.$emit('success', response, file, this.successFiles)
      } else {
        this.$emit('success', response, file)
      }
    },
    handleRemove(index) {
      if (this.multiple) {
        const data = [...this.computedValues]
        data.splice(index, 1)
        this.$emit('input', data || [])
      } else {
        this.$emit('input', null)
      }
    }
  },
  mounted () {
    // 插入到body中, 避免弹出层被遮盖
    if (this.crop && this.$refs.cropper) {
      document.body.appendChild(this.$refs.cropper.$el)
    }
  }
}
</script>

<style>
.ele-upload-image .el-loading-spinner {
  line-height: 1;
}
.ele-upload-image .el-upload-list__item-thumbnail {
  object-fit: cover;
}
.vue-image-crop-upload.ele-upload-image--cropper {
  z-index: 99;
}
.ele-upload-image--cropper .vicp-drop-area {
  background-color: #fbfdff !important;
}

.ele-upload-image--cropper .vicp-icon1-arrow {
  border-bottom-color: #909399 !important;
}
.ele-upload-image--cropper .vicp-icon1-body {
  background-color: #909399 !important;
}
.ele-upload-image--cropper .vicp-icon1-bottom {
  border-color: #909399 !important;
}
</style>
