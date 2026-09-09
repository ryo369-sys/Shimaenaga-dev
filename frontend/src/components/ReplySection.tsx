import React, { useEffect, useState } from 'react';
import { Button, TextField, Box, Typography, Avatar } from '@mui/material';
import axios from '../axios';
import type { Reply } from '../types/Reply';
import { UserLink } from './UserLink';
import { PostImage } from './PostImage';

interface ReplySectionProps {
  postId: number;
  currentUserId: number;
}

export const ReplySection: React.FC<ReplySectionProps> = ({ postId, currentUserId }) => {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ① 返信一覧を取得
  const fetchReplies = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/posts/${postId}/replies`);
      setReplies(response.data);
    } catch (error) {
      console.error('返信一覧の取得エラー:', error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchReplies();
    }
  }, [postId]);

  // ② 返信の送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);

    try {
      // 画像送信にも対応できるように FormData を使用
      const formData = new FormData();
      formData.append('user_id', String(currentUserId));
      formData.append('content', content);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axios.post(
        `http://localhost:8000/api/posts/${postId}/replies`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // 送信成功時：一覧の先頭/末尾に追加し、フォームをクリア
      setReplies((prev) => [...prev, response.data]);
      setContent('');
      setImageFile(null);
    } catch (error: any) {
      console.error('返信送信エラー:', error.response?.data || error);
      alert('返信の送信に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '16px' }}>
      <Typography variant="h6" style={{ marginBottom: '12px', fontSize: '1rem', fontWeight: 'bold' }}>
        返信一覧 ({replies.length})
      </Typography>

      {/* 返信入力フォーム */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="返信を入力..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginBottom: '8px' }}
        />

        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            style={{ fontSize: '0.8rem' }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || !content.trim()}
            size="small"
          >
            {loading ? '送信中...' : '返信する'}
          </Button>
        </Box>
      </form>

      {/* 返信一覧リスト */}
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {replies.length > 0 ? (
          replies.map((reply) => (
            <Box
              key={reply.id}
              style={{
                backgroundColor: '#f9f9f9',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #eee',
              }}
            >
              <Box style={{ marginBottom: '6px' }}>
                <UserLink
                  user_id={reply.user_id}
                  userName={reply.user?.name || reply.user?.username || `ユーザー${reply.user_id}`}
                />
              </Box>
              <Typography style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
                {reply.content}
              </Typography>
              {reply.image_path && <PostImage imagePath={reply.image_path} />}
            </Box>
          ))
        ) : (
          <Typography style={{ color: '#888', fontSize: '0.85rem' }}>
            まだ返信はありません。
          </Typography>
        )}
      </Box>
    </Box>
  );
};