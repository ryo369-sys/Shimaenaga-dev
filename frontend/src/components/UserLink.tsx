import { Link } from 'react-router-dom';

interface UserLinkProps {
  userId: number;
  userName: string;
}

// ユーザー名をクリックしたらプロフィールへ飛ばす共通部品
export const UserLink = ({ userId, userName }: UserLinkProps) => {
  return (
    <Link 
      to={`/users/${userId}`} 
      style={{ textDecoration: 'none', color: '#1da1f2', fontWeight: 'bold' }}
    >
      {userName}
    </Link>
  );
};