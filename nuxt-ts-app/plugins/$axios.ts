import qs from "qs";
import Cookie from "js-cookie";

export default function({ $axios, redirect , app }) {
  $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  $axios.defaults.withCredentials = true;

  // POST传参序列化
  $axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })
// 返回状态判断
  $axios.interceptors.response.use((res) => {
    if (res.status === 200) {
      return res
    } else {
      return Promise.reject(res)
    }
  }, (error) => {
    return Promise.reject(error)
  })
}



