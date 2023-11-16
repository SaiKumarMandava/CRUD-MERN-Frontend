import { Route,Routes } from 'react-router-dom';
import ADD from './components/Student/add'
import Edit from './components/Student/edit'
import Table from './components/Student/table'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div >
  <ToastContainer/>

    
    <Routes>
      <Route exact path='/' element={<Table/>}/>
      <Route path='/add' element={<ADD/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
      <Route exact path='/table' element={<Table/>}/>
    </Routes>
    </div>
  );
}

export default App;
