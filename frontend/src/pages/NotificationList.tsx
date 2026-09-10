import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface NotificationItem {
  id: number;
  type: 'like' | 'follow' | 'reply';
  is_read: boolean;
  created_at: string;
  actor: {
    name: string;
    username: string;
  };
  post?: {
    content: string;
  };
  reply?: {
    content: string;
  };
}

export const NotificationList: React.FC<{ currentUserId: number }> = ({ currentUserId }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`/api/notifications?user_id=${currentUserId}`);
        setNotifications(res.data);
      } catch (error) {
        console.error('通知一覧の取得エラー:', error);
      }
    };

    if (currentUserId) {
      fetchNotifications();
    }
  }, [currentUserId]);

  const renderMessage = (item: NotificationItem) => {
    switch (item.type) {
      case 'like':
        return `があなたの投稿「${item.post?.content.substring(0, 15)}...」にいいねしました`;
      case 'follow':
        return `があなたをフォローしました`;
      case 'reply':
        return `があなたの投稿に返信しました: 「${item.reply?.content.substring(0, 15)}...」`;
      default:
        return '';
    }
  };

  return (
    <div style={{ width: '320px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
      <h3>通知一覧</h3>
      {notifications.length === 0 ? (
        <p>通知はありません</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map((item) => (
            <li key={item.id} style={{
              padding: '8px',
              borderBottom: '1px solid #eee',
              backgroundColor: item.is_read ? '#fff' : '#e6f7ff'
            }}>
              <strong>{item.actor?.name}</strong> {renderMessage(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;