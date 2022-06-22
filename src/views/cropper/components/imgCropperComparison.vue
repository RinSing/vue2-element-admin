<template>
  <div>
    <el-button type="primary" @click="upldfile" style="">选择照片</el-button>
    <input type="file" id="uploadfile" @change="fnImgLocalChange($event)" style="display: none" />
    <div style="width: 90%; height: 550px; margin: auto">
      <div v-loading="isLoadingDia" style="width: 49%; height: 100%; float: left; text-align: center">
        <p style="font-size: 25px">修改前</p>

        <div style="border: 1px solid #b0b0a9;height: 86%; width: 100% float: left; ">
          <vueCropper
            ref="cropper"
            @imgLoad="onCropperImgLoad"
            @realTime="onRealTime"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :canScale="option.canScale"
            :centerBox="option.centerBox"
            :autoCrop="option.autoCrop"
            :full="option.full"
            :mode="option.mode"
            :fixedBox="option.fixedBox"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :enlarge="option.enlarge"
            :high="option.high"
            :original="option.original"
            :canMoveBox="option.canMoveBox"
          ></vueCropper>
        </div>
        <div style="float: right">
          <div style="display: inline-block; text-align: left; margin-top: 13px">
            <span style="font-size: larger">裁剪大小：</span>
            <el-input
              size="small"
              style="width: 80px"
              v-model="tailorImg.baseFileSizeKb"
              placeholder=""
              readonly
            ></el-input>
            kb
          </div>
          <div class="cropper-icon" style="display: inline-block">
            <i class="el-icon-zoom-in" @click="onScaleSmaller(+1)"></i>
            <i class="el-icon-zoom-out" @click="onScaleSmaller(-1)"></i>
            <i class="el-icon-refresh-right" @click="onRotateRight"></i>
            <i class="el-icon-refresh-left" @click="onRotateLeft"></i>
          </div>
        </div>
      </div>
      <div style="width: 49%; height: 100%; float: left; margin-left: 2%">
        <p style="font-size: 25px">修改后</p>
        <div style="border: 1px solid #b0b0a9; height: 86%; width: 100%">
          <img :src="this.tailorImg.src" style="height: 100%; width: 100%; object-fit: contain" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";
import { fnConvertFileToBase64, base64ToFile } from "@/utils/file";

export default {
  components: { VueCropper },

  data() {
    return {
      isLoadingDia: false,
      vueCropper: true,
      file: {},
      option: {
        img: "",
        size: 1,
        outputType: "jpeg",
        canScale: true,
        centerBox: true,
        info: true,
        autoCrop: true,
        autoCropWidth: 300,
        autoCropHeight: 400,
        full: false,
        infoTrue: false,
        mode: "contain",
        fixedBox: true,
        enlarge: 2,
        high: false,
        original: false,
        canMoveBox: false,
      },
      tailorImg: {
        src: "",
        baseFile: {},
        baseFileSizeKb: "",
        kb: 1024,
        min: 50,
        max: 500,
      },
    };
  },
  methods: {
    upldfile() {
      const fld = document.querySelector("#uploadfile");
      fld.value = "";
      fld.click();
    },
    async fnImgLocalChange(event) {
      if (event.target.files.length == 0) {
        return false;
      }

      this.option.img = await fnConvertFileToBase64(event.target.files[0]);
      this.tailorImg.src = "";
      this.file = file;
      let self = this;
      self.file.nameRep = self.file.name.replace(".png", ".jpg");
    },

    onScaleSmaller(val) {
      this.$refs.cropper.changeScale(val);
    },
    onRotateRight() {
      this.$refs.cropper.rotateRight();
    },
    onRotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    onCropperImgLoad(result) {
      if (result == "success") {
        setTimeout(() => {
          this.getCropData();
        }, 500);
        setTimeout(() => {
          this.isLoadingDia = false;
        }, 1000);
      }
    },
    onRealTime(data) {
      this.getCropData();
    },
    getCropData() {
      this.$refs.cropper.getCropData(async (data) => {
        this.tailorImg.src = data;
        this.tailorImg.baseFile = await base64ToFile(data, this.file.nameRep);
        this.tailorImg.baseFileSizeKb = this.tailorImg.baseFile.size / this.tailorImg.kb;
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px !important;
  height: 178px !important;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

#elUpload .el-upload {
  margin-top: 10%;
}
.cropper-icon i {
  font-size: 35px;
  padding: 10px;
  cursor: pointer;
}
</style>

<style scoped>
/deep/ .cropper-face {
  background-color: transparent !important;
}
::v-deep .el-dialog {
  margin-top: 5vh !important;
  width: 40%;
}
</style>
