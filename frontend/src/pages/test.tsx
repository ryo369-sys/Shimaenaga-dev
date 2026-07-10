// Dashboard.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const Dashboard: React.FC = () => {

  const { userId } = useParams<{ userId: string }>();

  console.log(userId)
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>ダッシュボード</h2>
      <p>ログインに成功した人だけが見られる秘密のページです！</p>
      <p>ようこそ、 <strong>{userId}</strong> さん！</p>
    </div>
  );
};

export default Dashboard;