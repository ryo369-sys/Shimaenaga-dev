import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import api from '../axios';

type PostFormProps = {
  endpoint: string;        // ★ 必須: 送信先API（例: '/posts' や '/posts/1/comments'）
  placeholder?: string;     // 入力欄のヒントテキスト
  buttonLabel?: string;     // ボタンの表示文字
  onSuccess?: () => void;   // 送信完了時に親画面（タイムラインなど）を更新する関数
};

export const PostForm: React.FC<PostFormProps> = ({
  endpoint,
  placeholder = '内容を入力してください...',
  buttonLabel = '送信',
  onSuccess,
}) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      // ★ 最低限知っておく点: user_id は送信しない！
      // バックエンド側で Auth::id() を参照して自動設定されるため、
      // フロントは「投稿内容(content)」だけを送信すればOK（セキュリティ向上）
      await api.post(endpoint, { content });

      setContent(''); // 送信成功したら入力欄を空にする
      if (onSuccess) onSuccess(); // 親側のデータ再取得処理を実行
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信に失敗しました。ログイン状態を確認してください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField
        fullWidth
        multiline
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        disabled={loading}
        sx={{ mb: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading || !content.trim()}
      >
        {loading ? '送信中...' : buttonLabel}
      </Button>
    </Box>
  );
};