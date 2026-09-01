import React from 'react';
import { Box } from '@mui/material';

// 親から「accuracy（シマエナガ度）」を受け取る設定
type AccuracyBadgeProps = {
  accuracy?: number | null; // 例: 95
};

export const AccuracyBadge: React.FC<AccuracyBadgeProps> = ({ accuracy }) => {
  // 判定データがない場合は何も表示しない
  if (accuracy === undefined || accuracy === null) return null;

  // ★ return の中身だけをコンパクトなバッジに変更
  return (
    <Box
      sx={{
        display: 'inline-block',
        px: 1.5,
        py: 0.5,
        borderRadius: '16px',
        backgroundColor: accuracy >= 70 ? '#e8f5e9' : '#fff3e0',
        color: accuracy >= 70 ? '#2e7d32' : '#e65100',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        mt: 1,
      }}
    >
      🐤 シマエナガ度: {accuracy}%
    </Box>
  );
};