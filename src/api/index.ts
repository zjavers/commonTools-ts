import axios from 'axios'

async function data8583(data: string) {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL+'/transform'
  console.log(API_BASE_URL);
  
  try {
    const imgResponse = await axios.get(API_BASE_URL+ '?data8583='+data);
    if (imgResponse.status !== 200)
      throw new Error(await imgResponse.data)
    const imgData = await imgResponse.data
    return Promise.resolve(imgData)
  }
  catch (error) {
    return Promise.resolve(error)
  }
}

async function data8583toString(data) {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL+'/retransform'
  console.log(API_BASE_URL);
  
  try {
    const imgResponse = await axios.post(API_BASE_URL,data);
    if (imgResponse.status !== 200)
      throw new Error(await imgResponse.data)
    const imgData = await imgResponse.data
    return Promise.resolve(imgData)
  }
  catch (error) {
    return Promise.resolve(error)
  }
}

export  { data8583,data8583toString }