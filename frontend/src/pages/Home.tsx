import { FC, useState } from 'react';
import { Button } from "@mui/material";
import axios from 'axios';
import type { Post } from '../types/Post';
import { UserLink } from '../components/UserLink';
import { GrayBox } from '../components/GrayBox'; // ★ 追加: グレーの枠コンポーネント
import api from '../axios';

export const Timeline: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // 1. APIからタイムラインデータを取得する
  const handleFileChange = async () => {
    try {
      const response = await api.get<Post[]>('/getAllTimeline');
      console.log(response.data);

      if (Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        console.error('【警告】配列ではないデータが返ってきたため画面更新をスキップしました');
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  };

  // ★ 2. 子(GrayBox)で枠が押された時に「発火」して動く親の処理
  const handlePostClick = (clickedId: number) => {
    console.log(`投稿ID: ${clickedId} の枠がクリックされました！`);
    // ここに将来「詳細画面へ遷移」などの処理を書きます
    alert(`投稿ID: ${clickedId} の枠が押されました`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>タイムライン</h2>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={handleFileChange}
      >
        テスト投稿
      </Button>

      {/* 投稿一覧エリア */}
      <div style={{ marginTop: '20px' }}>
        {posts.map((post) => (
          /* ★ 元の <div> を GrayBox コンポーネントに差し替え！ */
          <GrayBox 
            key={post.id} 
            postId={post.id} 
            onBoxClick={handlePostClick} // 親の関数を渡す
          >
            {/* 
               --- ここから下が children (中身) --- 
               ユーザーネームと本文を GrayBox に流し込む
            */}
            <div style={{ marginBottom: '8px' }}>
              <UserLink user_id={post.id} userName={post.userName} />
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

export default Timeline;