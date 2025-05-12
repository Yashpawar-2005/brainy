import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Search } from 'lucide-react'
import axios_instance from '../../utils/axios'
import { Card, CardHeader, CardTitle } from '../components/ui/card'
import CreateLink from '../ui/CreateLink'

const Mainpage = () => {
  const [videos, setvideos] = useState([])
  const [searchdata, setsearchdata] = useState("")
  const [togglecreate,settogglecreate]=useState(false)
  const changesearch = (e: any) => {
    e.preventDefault()
    setsearchdata(e.target.value)
  }

  useEffect(() => {
    const myfun = async () => {
      const data = await axios_instance.get("/link/all_links")
      setvideos(data.data.data)
    }
    myfun()
  }, [])

  
  useEffect(() => {
    const loadTwitter = () => {
      if ((window as any).twttr) {
        (window as any).twttr.widgets.load()
      } else {
        const script = document.createElement("script")
        script.src = "https://platform.twitter.com/widgets.js"
        script.async = true
        document.body.appendChild(script)
      }
    }
    loadTwitter()
  }, [videos])

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:\?v=|\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/)
    return match ? match[1] : ""
  }

  const handlesearch = async() => {
    try {
      console.log("searched:", searchdata)
      const res=await axios_instance.post("/trans/search",{search:searchdata})
     
      setvideos(res.data.data)
      console.log(res)
      
    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <div className="bg-black min-h-screen w-full flex flex-col">

      <div className="flex flex-row justify-between items-center p-4 border-b border-gray-700">
        <div className="text-white text-xl font-bold">J</div>
        <div className="flex gap-2">
          <Button>Create Sharable</Button>
          <Button onClick={() => {
  console.log("hi");
  settogglecreate((prev) => !prev);
}}>
  Create Card
</Button>
        </div>
      </div>

      
      <div className="flex items-center gap-2 p-4">
        <Input
          type="text"
          value={searchdata}
          onChange={changesearch}
          placeholder="Search Your Brain ..."
          className="flex-grow text-white"
        />
        <Search onClick={handlesearch} className="text-white cursor-pointer" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {videos.map((video: any) => {
          const videoId = extractVideoId(video.linkUrl)

          return (
            <Card
              key={video.id}
              className="bg-[#1f1f1f] border border-gray-700 shadow-lg rounded-2xl overflow-hidden"
            >
              <div className="aspect-video w-full">
                {video.type === "Youtube" && videoId && (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                )}

                {video.type === "Twitter" && (
                  <blockquote className="twitter-tweet w-full h-full">
                    <a href={video.linkUrl}></a>
                  </blockquote>
                )}

                {video.type === "Linkedin" && (
                  <a
                    href={video.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full h-full text-blue-400 underline text-center p-4"
                  >
                    View LinkedIn Post
                  </a>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-white text-md truncate">
                  {video.title || "Untitled Link"}
                </CardTitle>
                <p className="text-gray-400 text-xs mt-1">
                  Type: {video.type} • {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </CardHeader>
            </Card>
          )
          
        })}
         {togglecreate && <CreateLink settogglecreate={settogglecreate} />}
      </div>
    </div>
  )
}

export default Mainpage
