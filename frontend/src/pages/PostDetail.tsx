// pages/PostDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { ReplySection } from '../components/ReplySection';

export const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const currentUserId = Number(localStorage.getItem('currentUserId')) || 1;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* 投稿本文の取得・表示処理 */}
      <h2>投稿詳細</h2>

      {/* 返信セクション */}
      {postId && <ReplySection postId={Number(postId)} currentUserId={currentUserId} />}
    </div>
  );
};

export default PostDetail;