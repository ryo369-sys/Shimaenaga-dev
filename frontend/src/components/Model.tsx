import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

type Props = {
  imageUrl: string;
  label: string;
  confidence: number;
};

export const Model = ({
  imageUrl,
  label,
  confidence
}: Props) => {

    return (
  <div> {/* 背景 */}

    <div> {/* モーダル本体 */}

      <h2>シマエナガ判定結果</h2>

      {/* ① 画像 */}
      <img
        src={imageUrl}
        alt="imgFile"
        width={300}
      />

      {/* 画像URL */}

      {/* ② AI結果 */}
      <p>AI判定結果:{label} {confidence}</p>

      {/* ③ コメント */}
      <textarea
        placeholder="コメントを入力してください"
      />

      {/* ④ 保存 */}
      <button>保存</button>

      {/* ⑤ 閉じる */}
      <button>閉じる</button>

    </div>

  </div>
)};

export default Model;
