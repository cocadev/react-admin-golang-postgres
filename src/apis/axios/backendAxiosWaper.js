import backendAxios from './backendAxios.js';

const backendAxiosWaper = ({method,data,url})=>{

    method = method.toUpperCase();
    let urlArr = url.split('/api');

    if(urlArr.length > 1)
    {
        url = urlArr[1];
    }

   if(data && typeof(data)!='object')
   {
       data = JSON.parse(data);
   }

   switch(method){
       case 'GET':
       return backendAxios.get(url);
       break;


       case 'PUT':
       return backendAxios.put(url,data);
       break;

       case 'POST':
       return backendAxios.post(url,data);
       break;

       case 'DELETE':
       return backendAxios.delete(url);
       break;

       default:
       console.log('backendAxiosWaper unable to match method:',method);
   }

   return null;

}
export default backendAxiosWaper;
