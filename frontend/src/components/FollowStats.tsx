import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from '../axios';

type FollowStatsProps = {
  userId: number;
};

type Stats = {
  following_count: number;
  followers_count: number;
};

export const FollowStats: React.FC<FollowStatsProps> = ({ userId }) => {
  const [stats, setStats] = useState<Stats>({ following_count: 0, followers_count: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 先ほど FollowController で作成したエンドポイントを呼び出す
        const response = await axios.get(`/users/${userId}/follow-stats`);
        setStats({
          following_count: response.data.following_count,
          followers_count: response.data.followers_count,
        });
      } catch (error) {
        console.error('フォロー数の取得エラー:', error);
      }
    };

    if (userId) {
      fetchStats();
    }
  }, [userId]);

  return (
    <Box sx={{ display: 'flex', gap: 3, my: 1 }}>
      <Box>
        <Typography component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>
          {stats.following_count}
        </Typography>
        <Typography component="span" color="text.secondary">
          フォロー
        </Typography>
      </Box>

      <Box>
        <Typography component="span" sx={{ fontWeight: 'bold', mr: 0.5 }}>
          {stats.followers_count}
        </Typography>
        <Typography component="span" color="text.secondary">
          フォロワー
        </Typography>
      </Box>
    </Box>
  );
};