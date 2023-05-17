
import Header from './components/Header';
import Select from './components/Select';

import Home from './pages/Home';
import About from './pages/About';
import Directory from './pages/Directory';
import ErrorPage from './pages/ErrorPage';

import { Link, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {  

  return (
    <div className="App">



      <Link to="/"><img src="./logo.png" alt="" className="logo"></img></Link>
          <nav>
          <Link to="/about">about</Link>
          <Link to="/directory">directory</Link>
          </nav>

        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/directory" element={ <Directory /> } />
            <Route path="/about" element={ <About /> } />
            <Route path="*" element={ <ErrorPage /> } />
        </Routes>

      <Header />
      <Select /> 

    </div>
  );
}

export default App;