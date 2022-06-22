//import lzr from "lrz";

//base64 -> file  new File(fileArr, filename, { type: contentType})
export async function base64ToFile(base64Str, filename, src) {
  var iconv = require("iconv-lite");

  var arr = base64Str.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  // a = iconv.decode(Buffer.from(data, 'base64'), 'iso-8859-15')
  let file = new File([u8arr], filename, { type: mime });
  return file;
}

//file||convert转Base64
export async function fnConvertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export async function fnLzrCompress(file, obj) {
  return await lzr(file, obj).then((rst) => {
    return rst;
  });
}
