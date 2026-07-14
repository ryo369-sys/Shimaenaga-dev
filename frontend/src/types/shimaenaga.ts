// 📄 src/types/shimaenaga.ts

/**
 * シマエナガ判定の正答率を表すインターフェース
 */
export interface ShimaenagaAccuracy {
  realAccuracy: number;      // リアルシマエナガの正答率 (例: 0.85 = 85%)
  plushAccuracy: number;     // ぬいぐるみシマエナガの正答率 (例: 0.90 = 90%)
  totalAttempts: number;     // 総回答数（オプション。あれば全体の計算に便利です）
}

/**
 * ユーザーのゲームデータ全体（もし将来スコアなども管理するなら）
 */
export interface UserGameStats {
  userId: string;
  accuracy: ShimaenagaAccuracy; // 👈 上で作ったインターフェースを合体させて使い回せます！
  lastPlayedAt: string;
}