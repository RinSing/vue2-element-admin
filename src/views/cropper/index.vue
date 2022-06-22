<template>
  <div>
    <!-- <div style="width: 90%; border: 1px solid yellow; margin: auto">
      <div style="width: 49%; border: 1px solid yellow; float: left">
        <p>原图</p>
        <img :src="fileData.src" style="width: 100%" />
      </div>
      <div style="width: 49%; border: 1px solid yellow; float: left; margin-left: 1%">
        <p>裁剪后</p>
        <img />
      </div>
    </div> -->

    <!-- <img-cropper ref="imgCropper" @onChildrenImgCropper="onChildrenImgCropper" @upldfile="upldfile" /> -->
    <imgCropperComparison />
  </div>
</template>
<script>
import imgCropperComparison from "@/views/cropper/components/imgCropperComparison.vue";
export default {
  components: { imgCropperComparison },
  data() {
    return { fileData: {} };
  },
  methods: {
    /*弹窗裁剪
        upldfile() {
      const fld = document.querySelector("#uploadfile");
      fld.value = "";
      fld.click();
    },
    fnImgLocalChange(event) {
      if (event.target.files.length == 0) {
        return false;
      }
      this.$refs["imgCropper"].dialogVisible = true;
      this.$refs["imgCropper"].onChange(event.target.files[0]);
    },
   async onChildrenImgCropper(data) {
      this.fileData = {
        file: data.file,
        src: data.base64,
        fileName: data.fileName,
      };
    },
,*/
  },
};
</script>
