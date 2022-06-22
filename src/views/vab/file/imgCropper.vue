<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      title="编辑照片"
      @open="onDialogOpen"
      @close="onDialogClose"
    >
      <div>
        <div v-if="vueCropper" v-loading="isLoadingDia" style="height: 550px; text-align: center">
          <div style="width: 100%; height: 90%; margin: auto">
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

        <div style="text-align: right">
          <el-button @click="dialogVisible = false" style="padding: 7px 15px">取 消</el-button>
          <el-button @click="onDialogAnew" type="success" style="padding: 7px 15px" v-if="vueCropper">重 选</el-button>
          <el-button @click="onDialogSave" type="primary" style="padding: 7px 15px" v-if="vueCropper">保 存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { VueCropper } from "vue-cropper";
import { fnConvertFileToBase64, base64ToFile } from "@/utils/file";

import scan from "@/assets/scan.png"; //遮罩图片

export default {
  components: { VueCropper },

  data() {
    return {
      isLoadingDia: false,
      dialogVisible: false,
      vueCropper: true,
      imageUrl: "",
      scan: scan,
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
    onDialogOpen() {},
    onDialogClose() {
      Object.assign(this.$data, this.$options.data());
    },
    async onChange(file, fileList) {
      this.isLoadingDia = true;
      this.option.img = await fnConvertFileToBase64(file);
      this.vueCropper = true;
      this.tailorImg.src = "";
      this.file = file;
      let self = this;
      self.file.nameRep = self.file.name.replace(".png", ".jpg");
    },

    onDialogAnew() {
      this.$emit("upldfile");
    },
    async onDialogSave() {
      this.$emit("onChildrenImgCropper", {
        file: this.tailorImg.baseFile,
        base64: this.tailorImg.src,
        fileName: this.tailorImg.baseFile.name,
      });
      this.dialogVisible = false;
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
        console.log(this.tailorImg);
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
