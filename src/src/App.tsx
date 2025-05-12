// import { Button } from "@/components/ui/button"
import Mainpage from "./pages/Mainpage"
import StartPage from "./pages/StartPage"
import Login from "./pages/auth/Login"

import { Route, Routes } from "react-router-dom"
function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage/>}/>
      <Route path="/auth"element={<Login/>}/>
      <Route path="/mainpage" element={<Mainpage/>}/>
    </Routes>
   
    
  )
}

export default App
