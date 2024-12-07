import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' Component={Homepage}/>
        <Route path='/chats' Component={ChatPage}/>
      </Routes>
    </div>
  )
}

export default App;
