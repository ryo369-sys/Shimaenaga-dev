import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 💡 ① localStorage の currentUserId を削除
    localStorage.removeItem('currentUserId');

    // 💡 ② ログイン画面へリダイレクト
    navigate('/login');
  };

  return (
    <Button 
      variant="outlined" 
      color="error" 
      onClick={handleLogout}
    >
      ログアウト
    </Button>
  );
};