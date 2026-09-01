import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import type { Post } from '../types/Post';
import { UserLink } from '../components/UserLink';
import { GrayBox } from '../components/GrayBox';
import axios from '../axios';
import { PostImage } from '../components/PostImage';

// タブの型定義（自分の投稿 / 判別したシマエナガ）
type ProfileTabType = 'my_posts' | 'shimaenaga';

const Profile: React.FC = () => {
  const { user_id } = useParams<{ user_id: string }>();
  
  // テスト用: URLに user_id が無い場合は仮で "1" を使用
  const currentUserId = user_id || '1';

  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<ProfileTabType>('my_posts');
  const navigate = useNavigate();

  // ① 自分の投稿を取得する関数
  const fetchMyPosts = async () => {
    try {
      // 自分の投稿を取得するAPI (例: /api/posts/user/1)
      const response = await axios.get(`http://localhost:8000/api/posts/user/${currentUserId}`);
      
      const timelineData = Array.isArray(response.data) 
        ? response.data 
        : response.data.posts;

        console.log(response.data.posts)

      if (Array.isArray(timelineData)) {
        setPosts(timelineData);
      }
    } catch (error: any) {
      console.error('【重要】自分の投稿の取得エラー:', error.response?.data);
    }
  };

  // ② 判別したシマエナガ画像を取得する関数（※将来用）
  const fetchShimaenagaImages = async () => {
    // 今は判別機能を実装しないため、空配列にしておく
    setPosts([]);
  };

  // ③ タブ切り替え時に適切なAPIを実行する関数
  const loadProfileData = () => {
    if (activeTab === 'my_posts') {
      fetchMyPosts();
    } else {
      fetchShimaenagaImages();
    }
  };

  // activeTab が変わった時に自動で読み込む
  useEffect(() => {
    loadProfileData();
  }, [activeTab]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>マイプロフィール</h2>

      {/* --- タブ切り替えボタン --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button
          variant={activeTab === 'my_posts' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('my_posts')}
        >
          自分の投稿
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
          /* 自分の投稿タブの表示 */
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
          /* 判別したシマエナガタブの表示（プレースホルダー） */
          <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
            判別したシマエナガ画像はまだありません。
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;