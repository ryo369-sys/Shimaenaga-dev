import {Button,} from "@mui/material";
import { FC } from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import type { Post } from '../types/Post';
import axios from 'axios';
import { UserLink } from '../components/UserLink'

export const Timeline : FC =() => {
  const [posts, setPosts] = useState<Post[]>([]);
  //const navigate = useNavigate();

  // 1. async を追加して非同期関数にする
  const handleFileChange = async () => {
    try {
      // 2. await をつけてデータが返ってくるのを待つ
      const response = await axios.get<Post[]>('http://localhost:8000/api/timeline');
      // 3. データ本体は response.data で取得する
      console.log(response.data);
      // 【安全対策①】配列の時だけ state を更新する
      if (Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        console.error('【警告】配列ではないデータが返ってきたため画面更新をスキップしました');
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  };


  return (
    <div style={{ padding: '20px' }}>
      <h2>ダッシュボード</h2>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={handleFileChange}
      >
        テスト投稿
      </Button>

      {/* ③ データが入るとここに描画される */}
      <div style={{ marginTop: '20px' }}>
        {posts.map((post) => (
          <div key={post.id} >
            <UserLink userId={post.id} userName={post.userName} />
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;