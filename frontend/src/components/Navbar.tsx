import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUserId');
    navigate('/');
  };

  return (
    <nav
      style={{
        position: 'fixed', // 画面の右上に固定表示（スクロールしても固定）
        top: '16px',
        right: '16px',
        zIndex: 1000,     // 他の要素の下に隠れないように前面へ配置
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <Button 
        variant="outlined" 
        color="error" 
        onClick={handleLogout}
        size="small"
      >
        ログアウト
      </Button>
    </nav>
  );
};