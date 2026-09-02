import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import type { Post } from '../types/Post';
import { UserLink } from '../components/UserLink';
import { GrayBox } from '../components/GrayBox';
import { PostForm } from '../components/PostForm';
import axios from '../axios';
import { PostImage } from '../components/PostImage';
import { ShimaenagaBadge } from '../components/ShimaenagaBadge';

type TabType = 'all' | 'following';

const Dashboard: React.FC = () => {
  const { user_id } = useParams<{ user_id: string }>();
  
  // テスト用: URLにuser_idが無い場合は仮で "1" を使用
  const currentUserId = user_id || '1';

  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const navigate = useNavigate();

  // ① 全員のタイムライン取得
  const fetchTimeline = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/getAllTimeline');
      
      // レスポンスの型に応じて配列を抽出
      const timelineData = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.posts || []);

      console.log('取得したタイムライン:', timelineData);
      setPosts(timelineData);
    } catch (error: any) {
      console.error('【重要】通信エラー詳細:', error.response?.data);
      setPosts([]);
    }
  };

  // ② フォロー中のタイムライン取得
  const fetchgetTimeline = async () => {
    try {
      // URLに /api/ を指定
      const response = await axios.get(`http://localhost:8000/api/getTimeline/${currentUserId}`);
      
      const timelineData = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.posts || []);

      console.log('フォロー中タイムライン:', timelineData);
      setPosts(timelineData);
    } catch (error: any) {
      console.error('【重要】通信エラー詳細:', error.response?.data);
      setPosts([]);
    }
  };

  // ③ タブ切り替えや初期表示時に適切なAPIを実行する関数
  const loadPosts = () => {
    if (activeTab === 'all') {
      fetchTimeline();
    } else {
      fetchgetTimeline();
    }
  };

  // activeTab が変わった時に自動で切り替える
  useEffect(() => {
    loadPosts();
  }, [activeTab]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>タイムライン</h2>

      {/* --- タブ切り替えボタン --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Button
          variant={activeTab === 'all' ? 'contained' : 'outlined'}
          onClick={() => setActiveTab('all')}
        >
          おすすめ（全員）
        </Button>
        <Button
          variant={activeTab === 'following' ? 'contained' : 'outlined'}
          color="secondary"
          onClick={() => setActiveTab('following')}
        >
          フォロー中
        </Button>
      </div>

      <PostForm 
        endpoint="/posts" 
        placeholder="今なに設定してる？" 
        buttonLabel="投稿する" 
        onSuccess={loadPosts} 
      />

      <div style={{ marginTop: '20px' }}>
        {posts.length > 0 ? (
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
                <PostImage imagePath={post.image_path}
              />
              {/* ★ 画像の下に判別バッジを表示 */}
              <ShimaenagaBadge label={post.label} accuracy={post.accuracy} />
            </GrayBox>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
            {activeTab === 'all' ? '投稿がありません。' : 'フォロー中のユーザーの投稿はありません。'}
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;