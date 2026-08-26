import React, { useState } from 'react';
import { FollowButton } from '../components/Profile_follower';

export const Profile: React.FC = () => {
  const [followerCount, setFollowerCount] = useState(10); // 仮の初期フォロワー数
  const [isFollowing, setIsFollowing] = useState(false);

  // 子（ボタン）でフォロー状態が変わった時に呼ばれる関数
  const handleFollowToggle = (newIsFollowing: boolean) => {
    setIsFollowing(newIsFollowing);
    // フォローされたら +1、解除されたら -1 する
    setFollowerCount((prev) => (newIsFollowing ? prev + 1 : prev - 1));
  };

  return (
    <div>
      <h2>ユーザープロフィール</h2>
      <p>フォロワー数: {followerCount} 人</p>

      {/* 子コンポーネントの配置 */}
      <FollowButton
        targetUserId={123}
        initialIsFollowing={isFollowing}
        onFollowToggle={handleFollowToggle}
      />
    </div>
  );
};


export default Profile;