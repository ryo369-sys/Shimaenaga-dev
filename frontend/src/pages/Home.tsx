import { memo } from "react";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <nav>
      <Link to="/Home">home</Link>
      <p></p>
    </nav>
  );
}

export default Home;