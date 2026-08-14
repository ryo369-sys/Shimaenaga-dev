import React from 'react';
import { Box } from '@mui/material';

// 1. 親から受け取るデータの型（バトンの種類）を定義
interface GrayBoxProps {
  children?: React.ReactNode;          // 枠の中に挟む要素（何が入ってもOK）
  postId: number;                      // 自分が何番の投稿かを表すデータ
  onBoxClick: (clickedId: number) => void; // ★重要: 親から預かった「発火させるための関数」
}

export const GrayBox = ({ children, postId, onBoxClick }: GrayBoxProps) => {

  // クリックされた時に動く、子の中の処理
  const handleClick = () => {
    // ★★★ 最重要ポイント（発火） ★★★
    // 画面の枠が押されたら、親から受け取った関数(onBoxClick)を実行する！
    // その際、自分の ID (postId) を引数に入れて送ることで、親に「○番が押されたよ！」と伝わる。
    onBoxClick(postId);
  };

  return (
    <Box
      // HTMLレベルでクリックを感知したら、上の handleClick を動かす
      onClick={handleClick}
      sx={{
        backgroundColor: '#f5f5f5', // グレーの背景
        padding: '16px',             // 内側の余白
        marginBottom: '12px',        // 下の枠との間隔
        borderRadius: '8px',         // 角丸
        border: '1px solid #e0e0e0', // 枠線
        cursor: 'pointer',           // マウスを置いた時に指マークにする
        '&:hover': {
          backgroundColor: '#eeeeee', // ホバー時に少し暗くして「押せる」感を出す
        },
      }}
    >
      {/* 
        ★ children のポイント:
        タグとタグの間に挟まれた中身（投稿本文やユーザー名など）がここにそのまま表示される。
        枠（親）は中身が何であるかを知らなくて良い！
      */}
      {children}
    </Box>
  );
};