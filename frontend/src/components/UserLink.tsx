// UserLink.tsx

import { Link } from 'react-router-dom';

export const UserLink = ({ user_id, userName }: { user_id: number; userName: string }) => {
  return (
    <Link 
      to={`/profile/${user_id}`}
      onClick={(e) => {
        // ★ これを追加！親要素（GrayBox）のクリックイベントが動くのを防ぐ
        e.stopPropagation(); 
      }}
      style={{ fontWeight: 'bold', textDecoration: 'none', color: '#1da1f2' }}
    >
      @{userName}
    </Link>
  );
};