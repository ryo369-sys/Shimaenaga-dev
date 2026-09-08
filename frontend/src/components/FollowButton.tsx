import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import api from '../axios';

type FollowButtonProps = {
  targetUserId: number;  // フォローしたい相手のID
  currentUserId: number; // 自分のID
};

export const FollowButton: React.FC<FollowButtonProps> = ({ targetUserId, currentUserId }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // 自分自身の場合はボタンを表示しない
  if (Number(targetUserId) === Number(currentUserId)) {
    return null;
  }

  // ① マウント時に初期のフォロー状態を API で取得する
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await api.get(`/users/${targetUserId}/is-following`, {
          params: { current_user_id: currentUserId },
        });
        setIsFollowing(response.data.is_following);
      } catch (error) {
        console.error('フォロー状態の取得失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    if (targetUserId && currentUserId) {
      checkStatus();
    }
  }, [targetUserId, currentUserId]);

  // FollowButton.tsx 内

const handleToggle = async (e: React.MouseEvent) => {
  e.stopPropagation(); // 親要素（カード全体）のクリックイベント伝播を防止
  
  // 💡 ① 連打防止のためにローディング状態にする
  setLoading(true);

  try {
    if (isFollowing) {
      // フォロー解除処理
      await api.delete(`/users/${targetUserId}/follow`, {
        data: { current_user_id: currentUserId },
      });
      // 💡 ② 成功したら State を false（未フォロー）に変更
      setIsFollowing(false);
    } else {
      // フォロー処理
      await api.post(`/users/${targetUserId}/follow`, {
        current_user_id: currentUserId,
      });
      // 💡 ② 成功したら State を true（フォロー中）に変更
      setIsFollowing(true);
    }
  } catch (error) {
    console.error('フォロー切り替え処理失敗:', error);
    alert('フォロー処理に失敗しました。');
  } finally {
    // 💡 ③ ローディング解除
    setLoading(false);
  }
};

  return (
    <Button
        variant={isFollowing ? 'outlined' : 'contained'} // フォロー中なら枠線のみ、未フォローなら塗りつぶし
        color={isFollowing ? 'inherit' : 'primary'}
        disabled={loading}
        onClick={handleToggle}
        sx={{ borderRadius: '20px', textTransform: 'none' }}
    >
  {isFollowing ? 'フォロー中' : 'フォロー'}
</Button>
  );
};