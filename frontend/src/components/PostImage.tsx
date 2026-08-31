import React from 'react';

type PostImageProps = {
  imagePath: string | null | undefined;
};

export const PostImage: React.FC<PostImageProps> = ({ imagePath }) => {
  // 画像パスが存在しない場合は何も描画しない
  if (!imagePath) return null;

  // バックエンド（Laravel）の公開ストレージURLと結合
  const imageUrl = `http://localhost:8000/storage/${imagePath}`;

  // ★ クリック時のイベントハンドラ
  const handleImageClick = (e: React.MouseEvent) => {
    // 親要素（GrayBox）のクリックイベント（詳細遷移）をストップさせる
    e.stopPropagation();
  }

  return (
    <div style={{ marginTop: '10px' }}onClick={handleImageClick}>
      <img
        src={imageUrl}
        alt="投稿画像"
        style={{
          maxWidth: '100%',
          maxHeight: '300px',
          borderRadius: '8px',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
      />
    </div>
  );
};