import React from 'react';

// 1. フォロワー個人の型定義
export interface FollowerUser {
  id: number;
  name: string;
}

// 2. 親コンポーネントから受け取る Props の型定義
interface ProfileFollowProps {
  userName: string;
  followingCount: number;
  followerCount: number;
  followers: FollowerUser[];
}

export const ProfileFollow: React.FC<ProfileFollowProps> = ({
  userName,
  followingCount,
  followerCount,
  followers = [],
}) => {
    const safeFollowers = followers || [];
  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>{userName} さんのプロフィール</h2>
      <p>フォローしている数: <strong>{followingCount}</strong> 人</p>
      <p>フォロワー数: <strong>{followerCount}</strong> 人</p>

      <h3>フォロワー一覧</h3>
      {/* 判別: フォロワーが0人の場合の表示考慮 */}
      {safeFollowers.length === 0 ? (
        <p>フォロワーはまだいません</p>
      ) : (
        <ul>
          {safeFollowers.map((follower) => (
            <li key={follower.id}>{follower.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};