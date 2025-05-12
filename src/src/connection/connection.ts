import axios_instance from '../../utils/axios'
const abstract = async (data = null, link:string, method:string) => {
  try {
    let response;
    
    switch (method.toLowerCase()) {
      case 'get':
        response = await axios_instance.get(link, { params: data });
        break;
      case 'get2':
        response=await axios_instance.get(link);
        break;
      case 'post':
        response = await axios_instance.post(link, data);
        break;
      case 'put':
        response = await axios_instance.put(link, data);
        break;
      case 'delete':
        response = await axios_instance.delete(link, { data });
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    
    return response;
  } catch (error) {
    console.error(`API Error (${method} ${link}):`, error);
    return undefined;
  }
};

const query=async (data:any) => {
  return await abstract(data,"/trans/search","post")
}

const signup = async (data:any) => {
  return await abstract(data, "/auth/signup", "post");
};


const login = async (data:any) => {
  return await abstract(data, "/auth/login", "post");
};


export {login,signup,query}
