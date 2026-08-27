import React, { useState, useEffect } from 'react';
import { FollowButton } from '../components/FollowerCheck';
import { ProfileFollow } from '../components/FollowerCount';
import axios from 'axios'; // または作成した api インスタンス
import { useParams } from 'react-router-dom';

// 1. レスポンスデータの型定義（TypeScriptの場合）
interface ProfileData {
  user_id: number;
  user_name: string;
  follower_count: number;
  following_count:number;
  followers: { id: number; name: string }[];
}

export const Profile: React.FC = ()=> {
  const { userId } = useParams<{ userId: string }>();
  const [followerCount, setFollowerCount] = useState(10); // 仮の初期フォロワー数
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // APIを呼び出し
        const response = await axios.get(`/follower/${userId}`);
        
        // ★ ここ！response.data を profileData に格納（セット）する
        setProfileData(response.data);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    };

    fetchProfile();
  }, [userId]);

  // データ取得前（初期状態）のガード
  if (!profileData) {
    return <div>読み込み中...</div>;
  }

  // 子（ボタン）でフォロー状態が変わった時に呼ばれる関数
  const handleFollowToggle = (newIsFollowing: boolean) => {
    setIsFollowing(newIsFollowing);
    // フォローされたら +1、解除されたら -1 する
    setFollowerCount((prev) => (newIsFollowing ? prev + 1 : prev - 1));
  };

  return (
    <div>
    <ProfileFollow
      userName={profileData.user_name}
      followerCount={profileData.follower_count}
      followingCount={profileData.following_count}
      followers={profileData.followers}
    />

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