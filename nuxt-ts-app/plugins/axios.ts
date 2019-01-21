import axios from 'axios'
import qs from "qs";

// axios 配置
//axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;

if(  process.env.__ENV != 'development' ){
  //axios.defaults.baseURL = 'http://180.106.148.81:18082/testapms/';
  axios.defaults.baseURL = 'http://180.106.148.81:28083/"';
}
axios.onRequest(config => {
  config.data = qs.stringify(config.data, {
    allowDots: true //Option allowDots can be used to enable dot notation
  });
  return config;
});

axios.onResponse(response => {
  return Promise.resolve(response.data);
});

axios.onError(error => {
  return Promise.reject(error);
});

export default axios;



