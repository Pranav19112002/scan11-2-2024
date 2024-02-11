
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Addtype from './components/ScanType/Addtype';
import Adnavbar from './components/Navbar/Adnavbar';
import Adsidebar from './components/Navbar/Adsidebar';
import Editscanning from './components/Scanning/Editscanning';
import ViewScanning from './components/Scanning/Viewscanning';
import Adlogin from './Admin/Adlogin';
import Addscanning from './components/Scanning/Addscanning';
import Adregister from './Admin/Adregister';
import Edittype from './components/ScanType/Edittype';
import Viewtype from './components/ScanType/Viewtype';
import Adsettab from './components/Settings/Adsettab';
import Adminsettings from './components/Settings/Adminsettings';
import Bookings from './components/Bookings/Bookings';
import Adhome from './components/Scanning/Adhome';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path={'/login'} element={<Adlogin method='post'/>}></Route> 
      <Route path={'/addscan'} element={<Addscanning />}></Route>
      <Route path={'/adreg'} element={<Adregister />}></Route>
      <Route path={'/viewscan'} element={<ViewScanning />}></Route>
      <Route path={'/editscan'} element={<Editscanning />}></Route>
      <Route path={'/panel'} element={<Adhome />}></Route>
      <Route path={'/side'} element={<Adsidebar />}></Route>
      <Route path={'/nav'} element={<Adnavbar />}></Route>
      <Route path={'/addtype'} element={<Addtype />}></Route>
      <Route path={'/edittype'} element={<Edittype />}></Route>
      <Route path={'/viewtype'} element={<Viewtype />}></Route>
      <Route path={'/adsettab'} element={<Adsettab/>}></Route>
      <Route path={'/adset'} element={<Adminsettings/>}></Route>
      <Route path={'/book'} element={<Bookings/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
