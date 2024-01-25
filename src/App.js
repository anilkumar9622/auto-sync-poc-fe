// import logo from './logo.svg';
import { useRoutes } from 'react-router-dom';
import './App.css';
import Poc from './poc';
import PocListing from './component/pocListing';

function App() {
   const route = useRoutes([
    {path:"", element: <Poc/>},
    {path:"poc-list", element: <PocListing/>}
   ]) 

  return (
   <>
  {route}
   </>
  );
}

export default App;
