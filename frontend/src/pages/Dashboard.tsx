import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ★ useNavigate を追加
import { Button } from "@mui/material";
import type { Post } from '../types/Post';
import { UserLink } from '../components/UserLink';
import { GrayBox } from '../components/GrayBox';
import { PostForm } from '../components/PostForm';
import api from '../axios';

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  
  // ★ 1. ページ遷移用のフックを呼び出す
  const navigate = useNavigate();

  // タイムライン取得関数
  const fetchTimeline = async () => {
    try {
      const response = await api.get('/getAllTimeline');
      
      const timelineData = Array.isArray(response.data) 
        ? response.data 
        : response.data.posts;

      if (Array.isArray(timelineData)) {
        setPosts(timelineData);
      } else {
        console.error('【警告】配列データの取得に失敗しました');
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

  // ★ 2. 枠が押されたときに「投稿詳細ページ」へID付きで移動する処理に修正
  const handlePostClick = (clickedId: number) => {
    // 例: /posts/1 や /posts/15 のようなURLへ遷移する
    navigate(`/posts/${clickedId}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>タイムライン</h2>
      <PostForm 
        endpoint="/posts"            // APIの送信先（/store の場合は "/store"）
        placeholder="今なに設定してる？" // 入力欄の薄い文字（省略可）
        buttonLabel="投稿する"        // ボタンの文字（省略可）
        onSuccess={fetchTimeline}    // 送信が成功したら fetchTimeline を実行して画面を最新にする
      />
      <Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={fetchTimeline}
      >
        手動更新
      </Button>

      <div style={{ marginTop: '20px' }}>
        {posts.map((post: any) => (
          <GrayBox 
            key={post.id} 
            postId={post.id} 
            onBoxClick={handlePostClick}
          >
            <div style={{ marginBottom: '8px' }}>
              <UserLink 
                userId={post.user_id || post.userId} 
                userName={post.user_name || post.userName || post.user?.username} 
              />
            </div>
            <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {post.content}
            </p>
          </GrayBox>
        ))}

        <div style={{ padding: '20px', marginTop: '40px' }}>
          <h2>ダッシュボード</h2>
          <p>ようこそ、 <strong>{id}</strong> さん！</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;