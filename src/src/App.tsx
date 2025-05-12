// import { Button } from "@/components/ui/button"

import StartPage from "./pages/StartPage"
import { Route, Routes } from "react-router-dom"
function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage/>}/>
    </Routes>
   
    
  )
}

export default App
