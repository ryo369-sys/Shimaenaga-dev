import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@mui/material";
import type { Post } from '../types/Post';
import { UserLink } from '../components/UserLink';
import { GrayBox } from '../components/GrayBox';
import api from '../axios';

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Post[]>([]);

  // タイムライン取得関数
  const fetchTimeline = async () => {
    try {
      const response = await api.get('/getAllTimeline');
      
      // レスポンスが配列か、オブジェクト内の配列か判定してセット
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

  // 画面が開いた時に自動でタイムラインを取得する
  useEffect(() => {
    fetchTimeline();
  }, []);

  const handlePostClick = (clickedId: number) => {
    alert(`投稿ID: ${clickedId} の枠が押されました`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>タイムライン</h2>
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
              {/* post.user_id と post.user_name に修正 */}
              <UserLink userId={post.user_id || post.userId} userName={post.user_name || post.userName} />
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