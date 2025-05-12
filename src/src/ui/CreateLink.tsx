import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import axios_instance from "../../utils/axios";
interface CreateLinkProps {
  settogglecreate: (value: boolean) => void;
}


const CreateLink = ({ settogglecreate }: CreateLinkProps) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("Youtube");

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:\?v=|\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : "";
  };

  const handleSubmit = async () => {
  console.log({ title, url, type });
  const videoId = extractVideoId(url);
  const data = await axios_instance.post("/link/create", {
    title,
    Link: url,
    type,
    videoId,
  });
  console.log(data);
  settogglecreate(false);
};


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-[#1f1f2e] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6 relative">
   
        <button
          onClick={() => settogglecreate(false)}
          className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-gray-300"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center">Create Link</h2>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-black border-purple-700 text-white placeholder-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-black border-purple-700 text-white placeholder-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="bg-black border-purple-700 text-white">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-purple-700">
              <SelectItem value="Youtube">Youtube</SelectItem>
              <SelectItem value="Twitter">Twitter</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreateLink;
