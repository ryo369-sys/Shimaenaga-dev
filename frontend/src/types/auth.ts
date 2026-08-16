// src/types/auth.ts

export interface User {
  id: number;
  user_id: string;
  username: string;
}

// 成功時のレスポンス型
export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
}

// エラー（401や422バリデーションエラー）時の型
export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}