import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import usersData from '../src/__fixtures__/usersData.json';
import Authentication from './pages/Authentication/Authentication';
import Main from './pages/Main/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Authentication usersData={usersData} />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
