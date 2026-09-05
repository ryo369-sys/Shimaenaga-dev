import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

type LikeBottonProps = {
  status: boolean;
  likeCount?: number;
  onToggle: () => void;
};

export const LikeBotton: React.FC<LikeBottonProps> = ({status, likeCount ,onToggle}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {/* いいねアイコンボタン */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation(); // 親要素（カード）へのクリック伝播を防止
          onToggle();          // 親から渡された関数を実行
        }}
        size="small"
        sx={{ color: status ? 'error.main' : 'text.secondary' }}
      >
        {/* status が true なら赤ハート、false なら枠線ハート */}
        {status ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      {/* いいね数表示 */}
      <Typography variant="body2" color="text.secondary">
        {likeCount}
      </Typography>
    </Box>
  );
};
