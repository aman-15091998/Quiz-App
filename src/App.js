import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Quiz } from './Pages/Quiz Page/Quiz';
import { Welcome } from './Pages/Welcome Page/Welcome';

function App() {
  const router=createBrowserRouter([
    {path:"/", element:<Welcome/>},
    {path:"/quiz", element:<Quiz/>}
  ]);
  return (
      <RouterProvider router={router}/>
  )
}

export default App;
