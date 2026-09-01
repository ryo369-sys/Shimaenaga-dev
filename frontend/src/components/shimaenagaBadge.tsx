import React from 'react';
import { Box, Typography } from '@mui/material';

type ShimaenagaBadgeProps = {
  label?: string | null;
  accuracy?: number | string | null;
};

export const ShimaenagaBadge: React.FC<ShimaenagaBadgeProps> = ({ label, accuracy }) => {
  // label や accuracy が存在しない投稿の場合は何も表示しない
  if (!label && (accuracy === undefined || accuracy === null)) {
    return null;
  }

  // accuracy が文字列で届いた場合も扱えるように数値へ変換
  const numericAccuracy = typeof accuracy === 'string' ? parseFloat(accuracy) : accuracy;
  
  // 精度を％形式にフォーマット（例: 0.958 -> 95.8% / 95.8 -> 95.8%）
  const displayAccuracy = numericAccuracy !== null && numericAccuracy !== undefined
    ? numericAccuracy <= 1 
      ? (numericAccuracy * 100).toFixed(1) 
      : numericAccuracy.toFixed(1)
    : null;

  // シマエナガ判定かどうかでバッジのスタイルを変更
  const isShimaenaga = label?.includes('シマエナガ') ?? false;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 1.5,
        py: 0.5,
        mt: 1,
        borderRadius: '16px',
        backgroundColor: isShimaenaga ? '#e8f5e9' : '#fff3e0',
        border: `1px solid ${isShimaenaga ? '#a5d6a7' : '#ffe0b2'}`,
        color: isShimaenaga ? '#2e7d32' : '#e65100',
        fontWeight: 'bold',
        fontSize: '0.85rem',
      }}
    >
      <span>{isShimaenaga ? '🐤' : '🔍'}</span>
      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
        {label ?? '判別結果'}: {displayAccuracy !== null ? `${displayAccuracy}%` : '---'}
      </Typography>
    </Box>
  );
};