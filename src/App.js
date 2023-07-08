import { Route, Routes } from 'react-router'
import './App.css';
import { HomePage } from './cmps/home-page';
function App() {
  return (
    <div className='App'>
 
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
        </Routes>
    </div>
)
}

export default App;
