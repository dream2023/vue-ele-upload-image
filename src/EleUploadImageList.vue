<template>
  <div
    :class="[
      'el-upload-list',
      'el-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
  >
    <li
      :class="['el-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      :key="file.uid"
      @blur="focusing = false"
      @click="focusing = false"
      @focus="focusing = true"
      @keydown.delete="!disabled && $emit('remove', file)"
      tabindex="0"
      v-for="file in files"
    >
      <img
        :src="file.url"
        alt
        class="el-upload-list__item-thumbnail"
        v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
      >
      <a
        @click="handleClick(file)"
        class="el-upload-list__item-name"
      >
        <i class="el-icon-document"></i>
        {{file.name}}
      </a>
      <label class="el-upload-list__item-status-label">
        <i
          :class="{
          'el-icon-upload-success': true,
          'el-icon-circle-check': listType === 'text',
          'el-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
        }"
        ></i>
      </label>
      <i
        @click="$emit('remove', file)"
        class="el-icon-close"
        v-if="!disabled"
      ></i>
      <i
        class="el-icon-close-tip"
        v-if="!disabled"
      >{{ t('el.upload.deleteTip') }}</i>
      <el-progress
        :percentage="parsePercentage(file.percentage)"
        :stroke-width="listType === 'picture-card' ? 6 : 2"
        :type="listType === 'picture-card' ? 'circle' : 'line'"
        v-if="file.status === 'uploading'"
      ></el-progress>
      <span
        class="el-upload-list__item-actions"
        v-if="listType === 'picture-card'"
      >
        <span
          @click="handlePreview(file)"
          class="el-upload-list__item-preview"
          v-if="handlePreview && listType === 'picture-card'"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          @click="$emit('remove', file)"
          class="el-upload-list__item-delete"
          v-if="!disabled"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </li>
  </div>
</template>
<script>
import Locale from 'element-ui/src/mixins/locale';
import ElProgress from 'element-ui/packages/progress';

export default {
  name: 'EleUploadImageList',
  mixins: [Locale],
  data() {
    return {
      focusing: false
    };
  },
  components: { ElProgress },
  props: {
    files: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    animation: {
      type: Boolean,
      type: true
    },
    handlePreview: Function,
    listType: String
  },
  methods: {
    parsePercentage(val) {
      return parseInt(val, 10);
    },
    handleClick(file) {
      this.handlePreview && this.handlePreview(file);
    }
  }
}
</script>
