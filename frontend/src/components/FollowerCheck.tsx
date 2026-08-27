import React, { useState } from 'react';
import api from '../axios';// axiosインスタンスなど

interface FollowButtonProps {
  targetUserId: number;        // フォロー対象のユーザーID
  initialIsFollowing: boolean; // 初期状態（フォロー中かどうか）
  onFollowToggle: (isFollowing: boolean) => void; // ★ 親の表示を更新するための関数
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  targetUserId,
  initialIsFollowing,
  onFollowToggle,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleClick = async () => {
    try {
      if (isFollowing) {
        // フォロー解除 API 実行
        await api.delete(`/users/${targetUserId}/unfollow`);
        setIsFollowing(false);
        onFollowToggle(false); // 親に「解除された」と伝える
      } else {
        // フォロー API 実行
        await api.post(`/users/${targetUserId}/follow`);
        setIsFollowing(true);
        onFollowToggle(true); // 親に「フォローされた」と伝える
      }
    } catch (error) {
      console.error('フォロー処理に失敗しました', error);
    }
  };

  return (
    <button onClick={handleClick}>
      {isFollowing ? 'フォロー中' : 'フォローする'}
    </button>
  );
};