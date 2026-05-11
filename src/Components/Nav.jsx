import { Link } from 'react-router-dom';

function Nav() {
  return (
    <>
      <nav>
        <h1>Maxime Bastien</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/works">Works</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default Nav;