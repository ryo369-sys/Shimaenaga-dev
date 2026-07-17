// 📄 src/types/shimaenaga.ts

/**
 * シマエナガ判定の正答率を表すインターフェース
 */
export interface ShimaenagaAccuracy {
        names : string;
        accuracy : string;     // ぬいぐるみシマエナガの正答率 (例: 0.90 = 90%)
}

/**
 * ユーザーのゲームデータ全体（もし将来スコアなども管理するなら）
 */
export interface UserGameStats {
  userId: string;
  lastPlayedAt: string;
}