import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import type { Post } from '../types/Post';
import { UserLink } from '../components/UserLink';
import { GrayBox } from '../components/GrayBox';
import axios from '../axios';
import { PostImage } from '../components/PostImage';
import { FollowStats } from '../components/FollowStats';
import { FollowButton } from '../components/FollowButton';

// タブの型定義
type ProfileTabType = 'my_posts' | 'shimaenaga';

const Profile: React.FC = () => {
  // 💡 URLのパラメータから user_id または id を取得（ルート定義に合わせて対応）
  const params = useParams<{ user_id?: string; id?: string }>();
  
  // ログイン中のユーザーID（自分）
  const currentUserId = Number(localStorage.getItem('currentUserId')) || 1;

  // 💡 表示対象のプロフィールユーザーID（URLに無い場合は自分を表示）
  const profileUserId = Number(params.user_id || params.id) || currentUserId;

  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<ProfileTabType>('my_posts');
  const navigate = useNavigate();

  // ① 該当ユーザーの投稿を取得する関数
  const fetchUserPosts = async () => {
    try {
      // 💡 currentUserId ではなく profileUserId の投稿を取得
      const response = await axios.get(`http://localhost:8000/api/posts/user/${profileUserId}`);
      
      const timelineData = Array.isArray(response.data) 
        ? response.data 
        : response.data.posts;

      if (Array.isArray(timelineData)) {
        setPosts(timelineData);
      }
    } catch (error: any) {
      console.error('【重要】ユーザー投稿の取得エラー:', error.response?.data);
    }
  };

  // ② 判別したシマエナガ画像を取得する関数（※将来用）
  const fetchShimaenagaImages = async () => {
    setPosts([]);
  };

  // ③ タブ切り替え時または表示対象ユーザーが変わった時に再読み込み
  const loadProfileData = () => {
    if (activeTab === 'my_posts') {
      fetchUserPosts();
    } else {
      fetchShimaenagaImages();
    }
  };

  // activeTab または profileUserId が変わった時に読み込む
  useEffect(() => {
    loadProfileData();
  }, [activeTab, profileUserId]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>
        {profileUserId === currentUserId ? 'マイプロフィール' : 'ユーザープロフィール'}
      </h2>
      
      <div className="profile-header" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h3>ユーザーID: {profileUserId}</h3>

          {/* 💡 対象ユーザー(profileUserId) と 自分(currentUserId) を渡す */}
          <FollowButton 
            targetUserId={profileUserId} 
            currentUserId={currentUserId} 
          />
        </div>

        {/* 💡 対象ユーザーのフォロー/フォロワー数を表示 */}
        <FollowStats userId={profileUserId} />
      </div>

      {/* --- タブ切り替えボタン --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button
          variant={activeTab === 'my_posts' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('my_posts')}
        >
          {profileUserId === currentUserId ? '自分の投稿' : '投稿一覧'}
        </Button>
        <Button
          variant={activeTab === 'shimaenaga' ? 'contained' : 'outlined'}
          color="secondary"
          onClick={() => setActiveTab('shimaenaga')}
        >
          判別したシマエナガ
        </Button>
      </div>

      {/* --- コンテンツ表示エリア --- */}
      <div style={{ marginTop: '20px' }}>
        {activeTab === 'my_posts' ? (
          posts.length > 0 ? (
            posts.map((post: any) => (
              <GrayBox 
                key={post.id} 
                postId={post.id} 
                onBoxClick={() => navigate(`/posts/${post.id}`)}
              >
                <div style={{ marginBottom: '8px' }}>
                  <UserLink 
                    user_id={post.user_id} 
                    userName={post.user_name || post.userName || post.user?.username} 
                  />
                </div>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  {post.content}
                </p>
                <PostImage imagePath={post.image_path} />
              </GrayBox>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
              まだ投稿がありません。
            </p>
          )
        ) : (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
            判別したシマエナガ画像はまだありません。
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;