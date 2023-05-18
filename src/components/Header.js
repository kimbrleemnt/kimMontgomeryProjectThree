import Home from '../pages/Home';
import About from '../pages/About';
import Directory from '../pages/Directory';


import { Link, Routes, Route } from 'react-router-dom';

const Header = () => {

  return (
      <header>
          <nav className="topBar">
              <ul className="mainMenu">
                <li><Link to="/"><img src="./logo.png" alt="" className="logo"></img></Link></li>
                <li><Link to="/about">about</Link></li>
                <li><Link to="/directory">directory</Link></li>
              </ul>
          </nav>

        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/about" element={ <About /> } />
            <Route path="/directory" element={ <Directory /> } />
        </Routes>

          <section className="headerContainer">
              <h1>roller derby wheel selector</h1>
              <h2>take a spin to skate your best</h2>
          </section>
      </header>

  )
}

export default Header;