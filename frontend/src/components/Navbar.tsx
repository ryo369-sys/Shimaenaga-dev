import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Badge, Menu, MenuItem, Typography, Box, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  // 通知用の状態管理
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  // 未読件数の取得
  const fetchUnreadCount = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:8000/api/notifications/unread-count?user_id=${userId}`);
      setUnreadCount(res.data.unread_count);
    } catch (err) {
      console.error('未読件数の取得に失敗しました:', err);
    }
  };

  // 通知一覧の取得
  const fetchNotifications = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:8000/api/notifications?user_id=${userId}`);
      console.log('取得した通知データ:', res.data); // 💡 コンソールで中身を確認
      setNotifications(res.data);
    } catch (err) {
      console.error('通知一覧の取得に失敗しました:', err);
    }
  };

  // 💡 初期ロード時に件数と一覧の両方を取得
  useEffect(() => {
    if (userId) {
      fetchUnreadCount();
      fetchNotifications();
    }
  }, [userId]);

  // 🔔 ベルマークをクリックしたとき
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    fetchNotifications(); // 開いた時にも最新化
  };

  // メニューを閉じるとき
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // すべて既読にする
  const handleMarkAllRead = async () => {
    if (!userId) return;
    try {
      await axios.post('http://localhost:8000/api/notifications/read-all', { user_id: userId });
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (err) {
      console.error('既読処理に失敗しました:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('currentUserId');
    navigate('/');
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      {/* 💡 通知ベルマークアイコン */}
      <IconButton onClick={handleOpenMenu} color="default">
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* 💡 ドロップダウン形式の通知メニュー */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            style: {
              maxHeight: 400,
              width: '320px',
            },
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            通知
          </Typography>
          {unreadCount > 0 && (
            <Button size="small" onClick={handleMarkAllRead}>
              すべて既読にする
            </Button>
          )}
        </Box>
        <Divider />

        {/* 💡 0件の場合と一覧表示の条件分岐を追加 */}
        {notifications.length === 0 ? (
          <MenuItem onClick={handleCloseMenu}>
            <Typography variant="body2" color="text.secondary">
              通知はありません
            </Typography>
          </MenuItem>
        ) : (
          notifications.map((n) => (
            <MenuItem
              key={n.id}
              onClick={handleCloseMenu}
              sx={{
                backgroundColor: n.is_read ? 'inherit' : '#e8f0fe',
                whiteSpace: 'normal',
              }}
            >
              <Typography variant="body2">
                {n.type === 'like' && `❤️ ${n.actor?.name || 'ユーザー'} さんがあなたの投稿に「いいね」しました`}
                {n.type === 'follow' && `👤 ${n.actor?.name || 'ユーザー'} さんにフォローされました`}
                {n.type === 'reply' && `💬 ${n.actor?.name || 'ユーザー'} さんがあなたの投稿に返信しました`}
              </Typography>
            </MenuItem>
          ))
        )}
      </Menu>

      {/* ログアウトボタン */}
      <Button variant="outlined" color="error" onClick={handleLogout} size="small">
        ログアウト
      </Button>
    </nav>
  );
};