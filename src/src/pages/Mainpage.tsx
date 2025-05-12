import  { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Search } from 'lucide-react'
import axios_instance from '../../utils/axios'
const Mainpage = () => {
  const [videos, setvideos] = useState([])
  const [searchdata,setsearchdata]=useState("")
  const changesearch=(e:any)=>{
     e.preventDefault()
    setsearchdata(e.target.value)
  }
  useEffect(() => {
    const myfun=async () => {
        
        const data= await axios_instance.get("/link/all_links")
        console.log(data)
    }
    myfun()
   
  }, [videos,setvideos])
  
    const handlesearch=()=>{
        console.log("serached")
    }
  return (
    <div className='bg-black h-full w-full min-h-[100vh] flex flex-col'>
        <div className='flex flex-row justify-between'>
            <div>J</div>
            <div>
                <Button>Create Sharable</Button>
                <Button>Create Card</Button>
            </div>
        </div>
        <div className='w-full'>
            <span>
                 {/* <Input
                          type="email"
                          name="email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          placeholder="Email"
                          className="bg-zinc-900 border-zinc-700 text-white pl-10 placeholder:text-zinc-500 focus-visible:ring-purple-600 focus-visible:border-purple-500"
                          required
                        /> */}
            <Input type='data' value={searchdata} onChange={changesearch} placeholder='Search Your Brain ...'/>
            <Search onClick={()=>{handlesearch()}}/>
            </span>
        </div>
    </div>
  )
}

export default Mainpage