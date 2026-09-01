import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import axios from '../axios';

type PostFormProps = {
  endpoint: string;
  placeholder?: string;
  buttonLabel?: string;
  onSuccess?: () => void;
};

export const PostForm: React.FC<PostFormProps> = ({
  endpoint,
  placeholder = '投稿内容を入力してください',
  buttonLabel = '投稿する',
  onSuccess,
}) => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // 画像ファイル選択時のプレビュー生成
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 投稿送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !imageFile) return;

    setLoading(true);
    setStatusMessage('');

    try {
      let label: string | null = null;
      let accuracy: number | null = null;

      // ① 画像がある場合は先に FastAPI へ判定を要求
      if (imageFile) {
        setStatusMessage('シマエナガを判別中...');
        const fastApiFormData = new FormData();
        fastApiFormData.append('image', imageFile);

        // FastAPI へのリクエスト（レスポンス形式に合わせてプロパティを調整してください）
        const fastApiResponse = await axios.post(
          'http://localhost:8000/api/GetAccuracy',
          fastApiFormData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        // FastAPI のレスポンスデータから取得
        label = fastApiResponse.data.label ?? null;
        accuracy = fastApiResponse.data.accuracy ?? null;
      }

      // ② Laravel 送信用 FormData の構築
      setStatusMessage('投稿を保存中...');
      const laravelFormData = new FormData();
      laravelFormData.append('content', content);
      
      if (imageFile) {
        laravelFormData.append('image', imageFile);
      }
      if (label !== null) {
        laravelFormData.append('label', label);
      }
      if (accuracy !== null) {
        laravelFormData.append('accuracy', String(accuracy));
      }

      // ③ Laravel へ保存リクエスト
      await axios.post(endpoint, laravelFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // 入力フィールドのクリア
      setContent('');
      setImageFile(null);
      setImagePreview(null);
      setStatusMessage('');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('投稿エラー:', error.response?.data || error.message);
      setStatusMessage('投稿に失敗しました。');
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
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 1.5 }}
      />

      {/* 画像プレビュー領域 */}
      {imagePreview && (
        <Box sx={{ mb: 1.5, position: 'relative', display: 'inline-block' }}>
          <img
            src={imagePreview}
            alt="Upload Preview"
            style={{ maxHeight: '150px', borderRadius: '8px' }}
          />
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" component="label" disabled={loading}>
          画像を選択
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={loading || (!content.trim() && !imageFile)}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : buttonLabel}
        </Button>
      </Box>

      {/* ステータス / エラー表示 */}
      {statusMessage && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {statusMessage}
        </Typography>
      )}
    </Box>
  );
};