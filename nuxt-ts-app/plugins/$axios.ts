import qs from "qs";
import Cookie from "js-cookie";

export default function({ $axios, redirect , app }) {
  $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  $axios.defaults.withCredentials = true;

  $axios.onRequest(config => {
    config.data = qs.stringify(config.data, {
      allowDots: true //Option allowDots can be used to enable dot notation
    });
    return config;
  });


  $axios.onResponse(response => {
    return Promise.resolve(response.data);
  });

  $axios.onError(error => {
    return Promise.reject(error);
  });
}



