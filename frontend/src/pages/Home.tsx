import { memo } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Home() {

  const { age } = useParams<{ age: string }>();

  return (
    <div style={{ padding: '20px' }}>
      <h2>ダッシュボード</h2>
      <p>新規作成に成功した人だけが見られる秘密のページです！</p>
      <p>ようこそ、 <strong>{age}</strong> さん！</p>
    </div>
  );
}

export default Home;