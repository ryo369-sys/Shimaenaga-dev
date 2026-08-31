import React, { useState } from 'react';
import { Button, TextField, Box, IconButton, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ClearIcon from '@mui/icons-material/Clear';
import api from '../axios';


type PostFormProps = {
  endpoint: string;        // 送信先API
  placeholder?: string;    // 入力欄のヒントテキスト
  buttonLabel?: string;    // ボタンの表示文字
  onSuccess?: () => void;  // 送信完了時に実行する関数
};

export const PostForm: React.FC<PostFormProps> = ({
  endpoint,
  placeholder = '内容を入力してください...',
  buttonLabel = '送信',
  onSuccess,
}) => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 画像が選択されたときの処理
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // 選択した画像のプレビューURLを生成
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 選択した画像をキャンセルする処理
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !imageFile) return;

    setLoading(true);

    // ★ ファイルを送信するため FormData を使用
    const formData = new FormData();
    formData.append('content', content);
    if (imageFile) {
      formData.append('image', imageFile); // Laravel側で 'image' として受け取る
    }

    try {
      // Content-Type を multipart/form-data に設定して送信
      await api.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // フォームの初期化
      setContent('');
      handleRemoveImage();

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('【重要】通信エラー詳細:', error.response?.data);
      alert('送信に失敗しました。');
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

      {/* --- 画像プレビュー表示エリア --- */}
      {imagePreview && (
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 1 }}>
          <img
            src={imagePreview}
            alt="プレビュー"
            style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
          />
          <IconButton
            size="small"
            onClick={handleRemoveImage}
            sx={{
              position: 'absolute',
              top: 5,
              right: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
            }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* --- アクションエリア（画像選択 ＆ 送信ボタン） --- */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* ファイル選択ボタン (アイコン形式) */}
        <Button
          variant="outlined"
          component="label"
          startIcon={<PhotoCamera />}
          disabled={loading}
        >
          画像を選択
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        {/* 送信ボタン */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || (!content.trim() && !imageFile)}
        >
          {loading ? '送信中...' : buttonLabel}
        </Button>
      </Box>
    </Box>
  );
};