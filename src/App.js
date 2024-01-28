// import logo from './logo.svg';
import { useRoutes } from 'react-router-dom';
import './App.css';
import Poc from './poc';
import PocListing from './component/pocListing';
import { PocDemo } from './pocDemo';

function App() {
   const route = useRoutes([
    {path:"", element: <PocDemo/>},
    {path:"poc-list", element: <PocListing/>},
    {path:"poc-demo", element: <Poc/>}
   ]) 

  return (
   <>
  {route}
   </>
  );
}

export default App;
