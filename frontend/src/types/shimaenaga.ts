// 📄 src/types/shimaenaga.ts

/**
 * シマエナガ判定の正答率を表すインターフェース
 */
export interface ShimaenagaAccuracy {
        success : boolean;
        message : string;     // ぬいぐるみシマエナガの正答率 (例: 0.90 = 90%)
        name :string | null;
        accuracy:number[];
}

/**
 * ユーザーのゲームデータ全体（もし将来スコアなども管理するなら）
 */
export interface UserGameStats {
  userId: string;
  lastPlayedAt: string;
}

/**
 * ユーザーのゲームデータ全体（もし将来スコアなども管理するなら）
 */
type ImgInput = {
  file: File | null
  onResult: (data: ShimaenagaAccuracy[]) => void
}