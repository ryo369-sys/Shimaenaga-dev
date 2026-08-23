import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ★ useNavigate を追加
import { Button } from "@mui/material";
import type { Post } from '../types/Post';
import { UserLink } from '../components/UserLink';
import { GrayBox } from '../components/GrayBox';
import { PostForm } from '../components/PostForm';
import api from '../axios';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user_id } = useParams<{ user_id: string }>();
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

        console.log(response.data[0].user_id)

      if (Array.isArray(timelineData)) {
        setPosts(timelineData);
      } else {
        console.error('【警告】配列データの取得に失敗しました');
      }
    } catch (error:any) {
      console.error('【重要】通信エラー詳細:', error.response?.data);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, []);

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
      // 投稿カード全体のクリックは投稿詳細へ（例: /posts/1）
      onBoxClick={() => navigate(`/posts/${post.id}`)}
    >
      <div style={{ marginBottom: '8px' }}>
        {/* ユーザー名のクリックはプロフィールへ（UserLink内でstopPropagationしているため親は発火しない） */}
        <UserLink 
          user_id={post.user_id || post.user_id} 
          userName={post.user_name || post.userName || post.user?.username} 
        />
      </div>
      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
        {post.content}
      </p>
    </GrayBox>
    ))}
    </div>
  </div>
  );
};

export default Dashboard;