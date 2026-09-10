import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface NotificationBellProps {
  userId: number;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ userId }) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 1. 未読件数の取得
  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/notifications/unread-count?user_id=${userId}`);
      setUnreadCount(res.data.unread_count);
    } catch (err) {
      console.error('未読件数取得エラー:', err);
    }
  };

  // 2. 通知一覧の取得
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/notifications?user_id=${userId}`);
      setNotifications(res.data);
    } catch (err) {
      console.error('通知取得エラー:', err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUnreadCount();
    }
  }, [userId]);

  // ベルマーククリック時
  const handleToggle = () => {
    if (!isOpen) {
      fetchNotifications();
    }
    setIsOpen(!isOpen);
  };

  // 一括既読処理
  const handleMarkAllRead = async () => {
    try {
      await axios.post('http://localhost:8000/api/notifications/read-all', { user_id: userId });
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.error('既読処理エラー:', err);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 🔔 ベルアイコンボタン */}
      <button onClick={handleToggle} style={{ position: 'relative', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: -5, right: -5, background: 'red', color: 'white',
            borderRadius: '50%', padding: '2px 6px', fontSize: '10px'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {/* ドロップダウン形式の通知リスト */}
      {isOpen && (
        <div style={{
          position: 'absolute', right: 0, top: '30px', width: '300px',
          background: 'white', border: '1px solid #ccc', borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, padding: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <strong>通知</strong>
            <button onClick={handleMarkAllRead} style={{ fontSize: '12px' }}>すべて既読にする</button>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <li style={{ padding: '8px', fontSize: '14px', color: '#666' }}>通知はありません</li>
            ) : (
              notifications.map((n) => (
                <li key={n.id} style={{
                  padding: '8px', borderBottom: '1px solid #eee',
                  backgroundColor: n.is_read ? 'white' : '#f0f8ff'
                }}>
                  {n.type === 'like' && `❤️ ${n.actor?.name || '誰か'} があなたの投稿にいいねしました`}
                  {n.type === 'reply' && `💬 ${n.actor?.name || '誰か'} が返信しました`}
                  {n.type === 'follow' && `👤 ${n.actor?.name || '誰か'} にフォローされました`}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};