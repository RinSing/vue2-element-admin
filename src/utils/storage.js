import { storageType } from "@/config";
import { tokenName } from "@/config";
import cookies from "js-cookie";
export function getStorage(name, type = storageType) {
  if (type == "local") {
    return JSON.parse(localStorage.getItem(name));
  } else if (type == "session") {
    return JSON.parse(sessionStorage.getItem(name));
  } else if (type == "cookie") {
    return JSON.parse(cookies.get(name));
  }
}
export function setStorage(name, data, type = storageType) {
  let dataStr = JSON.stringify(data);
  if (type == "local") {
    localStorage.setItem(name, dataStr);
  } else if (type == "session") {
    sessionStorage.setItem(name, dataStr);
  } else if (type == "cookie") {
    cookies.set(name, dataStr);
  }
}
export function removeStorage(name, type = storageType) {
  if (type == "local") {
    name ? localStorage.removeItem(name) : localStorage.clear();
  } else if (type == "session") {
    name ? sessionStorage.removeItem(name) : sessionStorage.clear();
  } else if (type == "cookie") {
    // if (name) {
    //   cookies.remove(name);
    // } else {
    //   //   cookies.clear();
    // }
  }
}

export function getToken() {
  return cookies.get(tokenName);
}

export function setToken(data) {
  cookies.set(tokenName, data);
}
export function removeToken() {
  cookies.remove(tokenName);
}
