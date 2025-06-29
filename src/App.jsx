import { RouterProvider } from "react-router-dom"
import router from "./router"
import './index.css'; 
import './pages/Coin.modules.css';

function App () {
  return (
    <RouterProvider router={router} />
  )
}

export default App