import axios from "axios";

// 创建一个axios实例
const service = axios.create({
  baseURL: mainConfig.server,
  withCredentials: true,
  timeout: 5000
});
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做某事，比如说 设置tokena
    config.headers["X-Token"] = "xxxxxxxxxxxxxxxxxxx";
    return config;
  },
  error => {
    // 请求错误时做些事
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 如果返回的状态不是200 就主动报错
    if (res.status !== 200) {
      return Promise.reject(res.message || "error");
    }
    return res.data.data;
  },
  error => {
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);

export default service;
