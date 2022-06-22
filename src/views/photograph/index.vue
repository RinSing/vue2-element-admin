<template>
  <div>
    <div>
      <el-button type="primary" @click="onCameraOpen">打开摄像头</el-button>
    </div>
    <div><img :src="uploadingFile.src" /></div>
    <photographDialog v-if="isCameraPhotoDialog" @onPhotographDialog="onPhotographDialog"></photographDialog>
  </div>
</template>
<script>
import photographDialog from "@/views/photograph/components/photographDialog.vue";

export default {
  components: { photographDialog },
  data() {
    return { isCameraPhotoDialog: false, uploadingFile: { src: "" } };
  },
  methods: {
    onCameraOpen() {
      this.isCameraPhotoDialog = true;
    },
    onPhotographDialog(data) {
      if (data.img) {
        this.uploadingFile.src = data.img;
      }
      this.isCameraPhotoDialog = false;
    },
  },
};
</script>
