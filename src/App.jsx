import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Tone1 from './components/Tone1';
import Tone2 from './components/Tone2';
import Tone3 from './components/Tone3';
import Tone4 from './components/Tone4';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Tone1 />} />
          <Route path='/tone1' element={<Tone1 />} />
          <Route path='/tone2' element={<Tone2 />} />
          <Route path='/tone3' element={<Tone3 />} />
          <Route path='/tone4' element={<Tone4 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
