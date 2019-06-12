import EleUploadImage from './EleUploadImage'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(EleUploadImage.name, EleUploadImage)
}

export default EleUploadImage
