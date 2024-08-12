import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Quiz } from './Pages/Quiz Page/Quiz';
import { Welcome } from './Pages/Welcome Page/Welcome';
import { Error } from './Pages/Error Page/Error';

function App() {
  const router=createBrowserRouter([
    {path:"/", element:<Welcome/>, errorElement:<Error/>},
    {path:"/quiz", element:<Quiz/>}
  ]);
  return (
      <RouterProvider router={router}/>
  )
}

export default App;
