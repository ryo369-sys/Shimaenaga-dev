// Dashboard.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const Profile: React.FC = () => {

  const { user_id } = useParams<{ user_id: string }>();

  
  return (
    <div style={{ padding: '20px' }}>
      <h2>ダッシュボード</h2>
      <p>ログインに成功した人だけが見られる秘密のページです！</p>
      <p>ようこそ、 <strong>{user_id ?? 'ゲスト'}</strong> さん！</p>
    </div>
  );
};

export default Profile;