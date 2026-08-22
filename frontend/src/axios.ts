import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // LaravelのAPI URL
  withCredentials: true, // Cookie認証（Sanctum SPA）を使っている場合は必須
});

// リクエストを送る直前にトークンを自動でセットする設定（localStorageを使う場合）
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 保存したトークン名
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;