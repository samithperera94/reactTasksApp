import { useState,useCallback } from "react";
const useFetch = async() => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig,applyData) => {
        // debugger
        console.log("requestConfig,applyData",requestConfig,applyData)
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            requestConfig.url,{
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers:requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            }
          );
    
          console.warn("response is",response)
          if (!response.ok) {
            throw new Error('Request failed!');
          }
    
          const data = await response.json();
          console.warn("data is",data)
    
         applyData(data);
        } catch (err) {
          setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
      },[]);
    //   return{
    //       isLoading:isLoading,
    //       error:error,
    //       sendRequest:sendRequest
    //   }
    console.log(typeof sendRequest,"::::")
    return{
        isLoading,
        error,
        sendRequest,
    }
}

export default useFetch;