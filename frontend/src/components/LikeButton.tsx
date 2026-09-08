import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type LikeButtonProps = {
  status: boolean;      // いいねしているかどうか (isLiked)
  likeCount: number;    // いいねの数
  onToggle: () => void; // クリックされた時に呼ばれる関数
};

export const LikeButton: React.FC<LikeButtonProps> = ({ status, likeCount, onToggle }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton 
        onClick={(e) => {
          e.stopPropagation(); // 投稿詳細への遷移など、親のクリックを防止
          onToggle();
        }} 
        color={status ? 'error' : 'default'}
        size="small"
      >
        {status ? <FavoriteIcon sx={{ color: '#e91e63' }} /> : <FavoriteBorderIcon />}
      </IconButton>
      <Typography variant="body2" sx={{ ml: 0.5, color: 'text.secondary' }}>
        {likeCount}
      </Typography>
    </Box>
  );
};