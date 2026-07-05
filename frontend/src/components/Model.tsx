import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

type Props = {
  showFlag: boolean;
  imageUrl: string;
  result: {
    label: string;
    confidence: number;
  };
};

const Modal = ({showFlag}:Props) => {
    const [showModal, setShowModal] = useState(false);
    setShowModal(true);

    return (
  <div> {/* 背景 */}

    <div> {/* モーダル本体 */}

      <h2>シマエナガ判定結果</h2>

      {/* ① 画像 */}
      <img
        src="sample.jpg"
        alt="bird"
        width={200}
      />

      {/* ② AI結果 */}
      <p>AI判定結果:シマエナガ 87%</p>

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
);
};

export default Modal;

