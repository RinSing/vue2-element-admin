import Vue from 'vue'
import { MessageBox, Message } from 'element-ui'
//MessageBox弹框.确定||取消
Vue.prototype.$fnElMessBoxConfirm = async function (
  content,
  title,
  confirmBut = '确定',
  cancelBut = '取消',
  type = 'warning'
) {
  let isConfirmBut = false
  await MessageBox.confirm(content, title, {
    confirmButtonText: confirmBut,
    cancelButtonText: cancelBut,
    type: type,
    closeOnClickModal: false,
  })
    .then(() => {
      isConfirmBut = true
    })
    .catch(() => {
      isConfirmBut = false
    })
  return isConfirmBut
}
Vue.prototype.$fnElMessBoxAlert = async function (content, title, confirmBut = '确定') {
  await MessageBox.alert(content, title, {
    confirmButtonText: confirmBut,
  })
}

Vue.prototype.$fnElMessageExamine = async function (content, msgType = 'error') {
  Message({
    type: msgType,
    message: content,
  })
}
