import { AsyncStorage, Alert } from 'react-native';
import { create } from 'apisauce';


const api = create ({
    baseURL: 'http://192.168.1.114:8000'
});

api.addAsyncRequestTransform( request => async () => {

    const token = await AsyncStorage.getItem('@CodeApi:token');

    if (token)
    {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    
});

api.addResponseTransform( response => {
    
    /*if (response.data.error == 'Token is Expired' | response.data.error == 'Authorization Token not found' ){
        throw response;
    }*/
    if(!response.ok)
    {   
        throw response; 
    }
});

export default api;