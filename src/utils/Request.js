import axios from 'axios';
import { ElLoading } from 'element-plus';
import router from '@/router';
import Message from '../utils/Message';

const contentTypeForm = 'application/x-www-form-urlencoded;charset=UTF-8';
const responseTypeJson = 'json';

let loading = null;

// 创建 Axios 实例
const instance = axios.create({
  baseURL: '/api',  // 确保与后端的 baseURL 一致
  timeout: 10 * 1000,
});

// 请求前拦截器
instance.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 JWT 令牌
    const token = localStorage.getItem('jwtToken');
    console.log(token);

    // 如果有令牌，将其添加到请求头中
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (config.showLoading) {
      loading = ElLoading.service({
        lock: true,
        text: '加载中......',
        background: 'rgba(0, 0, 0, 0.7)',
      });
    }

    return config;
  },
  (error) => {
    if (loading) {
      loading.close();
    }
    Message.error('请求发送失败');
    return Promise.reject('请求发送失败');
  }
);

// 请求后拦截器
instance.interceptors.response.use(
  (response) => {
    const { showLoading, errorCallback, showError = true } = response.config;
    if (showLoading && loading) {
      loading.close();
    }

    const responseData = response.data;

    // 正常请求
    if (responseData.code === 0) {
      return responseData;
    } else if (responseData.code === 901 || response.status === 401) {
      // 登录超时或未授权
      alert('登录已过期，请重新登录');
      router.push('/login?redirectUrl=' + encodeURI(router.currentRoute.value.path));
      return Promise.reject({ showError: false, msg: '登录超时' });
    } else {
      // 其他错误
      if (errorCallback) {
        errorCallback(responseData.message);
      }
      return Promise.reject({ showError: showError, msg: responseData.message });
    }
  },
  (error) => {
    if (loading) {
      loading.close();
    }
    Message.error('网络异常');
    return Promise.reject({ showError: true, msg: '网络异常' });
  }
);

// 请求封装
const request = (config) => {
  const { url, params, showLoading = true, responseType = responseTypeJson } = config;
  const formData = new URLSearchParams();

  // 创建 form 对象
  for (let key in params) {
    formData.append(key, params[key] === undefined ? '' : params[key]);
  }

  const headers = {
    'Content-Type': contentTypeForm,
    'X-Requested-With': 'XMLHttpRequest',
    // 合并传入的 headers 确保 Authorization 头部不会被覆盖
    ...config.headers,
  };

  return instance
    .post(url, formData.toString(), {  // 使用 `toString()` 将 `URLSearchParams` 转换为字符串
      responseType: responseType,
      headers: headers,
      showLoading: showLoading,
      errorCallback: config.errorCallback,
      showError: config.showError,
    })
    .catch((error) => {
      console.error(error);
      if (error.showError) {
        Message.error(error.msg);
      }
      return null;
    });
};

export default request;