<template>
  <div class="photograph">
    <el-dialog
      title="摄像头拍照"
      :visible.sync="isCameraPhotoDialog"
      @close="onCameraClose"
      class="cameraPhotoDialogClass"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :append-to-body="true"
    >
      <div v-loading="isLoadingDia">
        <div class="centre" v-loading="isLoadingDiaContent" style="width: 600px; height: 530px; margin: auto">
          <div v-show="isCameraPhotoOrCanvas" style="position: relative; display: none">
            <div style="text-align: center">
              <video id="video" autoplay :width="videoWidth" :height="videoHeight"></video>
              <canvas v-show="false" id="canvas"></canvas>
              <div class="shade">
                <img :src="scan" style="height: 100%; width: 100%" />
              </div>
            </div>
            <div style="width: 600px; height: 32px; text-align: left; margin-top: 5px">
              <span style="color: red; font-size: 18px">注：拍摄头部必须刚好充满头像框。</span>
            </div>
          </div>

          <div v-show="!isCameraPhotoOrCanvas" style="">
            <div style="background-color: #ffffff80; width: 600px; height: 480px; margin: auto">
              <img :src="option.img" style="width: 100%; height: 100%; object-fit: contain" />
            </div>
            <div style="display: inline-block; text-align: left; margin-top: 5px">
              <span style="font-size: larger">图片大小：</span>
              <el-input
                size="small"
                style="width: 80px"
                v-model="tailorImg.baseFileSizeKb"
                placeholder=""
                readonly
              ></el-input>
              kb
            </div>
          </div>
        </div>
        <div style="text-align: right">
          <el-button @click="isCameraPhotoDialog = false" style="padding: 7px 15px">取 消</el-button>
          <el-button
            @click="onCameraRephotograph"
            type="success"
            style="padding: 7px 15px"
            v-if="!isCameraPhotoOrCanvas"
          >
            重 拍
          </el-button>
          <el-button @click="onCameraPhotoSave" type="primary" style="padding: 7px 15px" v-if="!isCameraPhotoOrCanvas">
            保 存
          </el-button>
          <el-button @click="onCameraPhoto" type="primary" plain style="padding: 7px 15px" v-if="isCameraPhotoOrCanvas">
            拍 摄
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import scan from "@/assets/scan.png"; //遮罩图片
import { base64ToFile } from "@/utils/file";
export default {
  components: {},

  data() {
    return {
      isLoadingDia: false,
      isLoadingDiaContent: false,
      isCameraPhotoDialog: false,
      isCameraPhotoOrCanvas: false,
      scan: scan,
      videoWidth: 600,
      videoHeight: 480,

      uploadingFile: {
        id: "",
        img: "",
      },

      isTailorImg: false,
      option: {
        img: "",
        size: 1,
        outputType: "jpeg",
        canScale: true,
        centerBox: true,
        info: true,
        autoCrop: true,
        autoCropWidth: 240,
        autoCropHeight: 320,
        infoTrue: false,
        mode: "cover",
        fixedBox: true,
        enlarge: 2,
        maximgsize: 10000,
        full: true,
        high: false,
        original: true,
        canScale: false,
      },
      tailorImg: {
        src: "",
        baseFileSizeKb: "",
        baseFile: {},
        fileName: "",
      },
    };
  },
  created() {
    this.isCameraPhotoDialog = true;
    this.fnPhotographInit();
  },
  methods: {
    fnPhotographInit() {
      let self = this;
      this.isCameraPhotoOrCanvas = true;
      this.isLoadingDia = true;
      if (this.fnHasUserMedia()) {
        navigator.getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia;
        navigator.getUserMedia(
          {
            video: {
              width: { min: self.videoWidth, max: self.videoWidth },
              height: { min: self.videoHeight, max: self.videoHeight },
            },
            audio: false,
          },
          function (stream) {
            console.log(stream);
            var video = document.querySelector("video");

            try {
              video.srcObject = stream;
            } catch (error) {
              video.src = window.URL.createObjectURL(stream);
            }
            self.isLoadingDia = false;
          },
          function (err) {
            self.$fnElMessageExamine("请设置浏览器可以启动摄像头!", "error");
            self.$emit("onPhotographDialog", self.uploadingFile);
          }
        );
      } else {
        self.$fnElMessageExamine("操作失败,浏览器不支持此操作!");
        self.$emit("onPhotographDialog", self.uploadingFile);
      }
    },
    onCameraRephotograph() {
      this.isCameraPhotoOrCanvas = true;
      this.uploadingFile.id = "";
      this.uploadingFile.img = "";
    },
    async onCameraPhoto() {
      let self = this;
      self.isCameraPhotoOrCanvas = false;

      var cxt = document.getElementById("canvas").getContext("2d");
      var video = document.getElementById("video");
      let canvas = document.getElementById("canvas");
      canvas.width = 600;
      canvas.height = 480;
      cxt.drawImage(video, 0, 0);
      this.option.img = document.getElementById("canvas").toDataURL("image/jpeg");
      this.tailorImg.fileName = new Date().getTime() + "A" + Math.ceil(Math.random() * 10000) + ".jpg";

      this.tailorImg.baseFile = await base64ToFile(this.option.img, this.tailorImg.fileName);
      this.tailorImg.baseFileSizeKb = this.tailorImg.baseFile.size / 1024;

      this.tailorImg.src = this.option.img;
    },
    async onCameraPhotoSave() {
      // this.$refs.cropper.getCropData(async (data) => {
      // let baseFile = await base64ToFile(data, fileName)
      // let file = await fnLzrCompress(baseFile)
      // if (file.fileLen / 1024 > 150) {
      //   this.$baseMessage('上传失败,照片不能大于150kb。', 'error', false, 'vab-hey-message-error')
      //   return false
      // } else {
      //   this.uploadingFile.img = file.base64
      // }
      // })
      this.uploadingFile.img = this.tailorImg.src;
      this.$emit("onPhotographDialog", this.uploadingFile);
    },
    onCameraClose() {
      try {
        let tracks = document.getElementById("video").srcObject.getTracks();
        for (let t = 0; t < tracks.length; t++) {
          tracks[t].stop();
        }
      } catch (e) {}

      this.$emit("onPhotographDialog", this.uploadingFile);
    },
    fnHasUserMedia() {
      return !!(
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia
      );
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
        let self = this;
        //this.tailorImg.fileName = new Date().getTime() + 'A' + Math.ceil(Math.random() * 10000) + '.jpg'
        // this.tailorImg.src = data
        // this.tailorImg.baseFile = await base64ToFile(data, this.tailorImg.fileName)
        // this.tailorImg.baseFileSizeKb = this.tailorImg.baseFile.size / 1024
        // return false
      });
    },

    // getCompetence() {
    //   var _this = this
    //   this.thisCancas = document.getElementById('canvasCamera')
    //   this.thisContext = this.thisCancas.getContext('2d')
    //   this.thisVideo = document.getElementById('videoCamera')
    //   // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
    //   if (navigator.mediaDevices === undefined) {
    //     navigator.mediaDevices = {}
    //   }
    //   // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
    //   // 使用getUserMedia，因为它会覆盖现有的属性。
    //   // 这里，如果缺少getUserMedia属性，就添加它。
    //   if (navigator.mediaDevices.getUserMedia === undefined) {
    //     navigator.mediaDevices.getUserMedia = function (constraints) {
    //       // 首先获取现存的getUserMedia(如果存在)
    //       var getUserMedia =
    //         navigator.webkitGetUserMedia ||
    //         navigator.mozGetUserMedia ||
    //         navigator.getUserMedia
    //       // 有些浏览器不支持，会返回错误信息
    //       // 保持接口一致
    //       if (!getUserMedia) {
    //         return Promise.reject(
    //           new Error('getUserMedia is not implemented in this browser')
    //         )
    //       }
    //       // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
    //       return new Promise(function (resolve, reject) {
    //         getUserMedia.call(navigator, constraints, resolve, reject)
    //       })
    //     }
    //   }
    //   var constraints = {
    //     audio: false,
    //     video: {
    //       // width: this.videoWidth,
    //       // height: this.videoHeight,
    //       // transform: 'scaleX(-1)',
    //       width: 320,
    //       height: 240,
    //     },
    //   }
    //   navigator.mediaDevices
    //     .getUserMedia(constraints)
    //     .then(function (stream) {
    //       if ('srcObject' in _this.thisVideo) {
    //         _this.thisVideo.srcObject = stream
    //       } else {
    //         _this.thisVideo.src = window.URL.createObjectURL(stream)
    //       }
    //       _this.thisVideo.onloadedmetadata = function (e) {
    //         _this.thisVideo.play()
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    //  绘制图片（拍照功能）

    // setImage() {
    //   var _this = this
    //   // 点击，canvas画图
    //   _this.thisContext.drawImage(_this.thisVideo, 0, 0, 320, 240)
    //   // 获取图片base64链接
    //   var image = this.thisCancas.toDataURL('image/png')
    //   _this.imgSrc = image
    //   this.$emit('refreshDataList', this.imgSrc)
    // },
  },
};
</script>

<style scoped>
/deep/ .cropper-face {
  background-color: transparent !important;
}
.shade {
  /* width: 100%; */
  /* position: absolute;
  top: 15px;
  height: 450px; */
  width: 600px;
  height: 480px;
  margin: auto;
  /* margin-top: -57.5%; */
  margin-top: -484px;
}

::v-deep .el-dialog {
  width: 40%;
}
@media screen and (max-width: 1366px) {
  ::v-deep .el-dialog {
    width: 50%;
  }
}

::v-deep .el-dialog {
  margin-top: 5vh !important;
}
</style>
>
