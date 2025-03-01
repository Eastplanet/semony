import axios, {AxiosRequestConfig} from 'axios';

const request = async (url: string, params?: Record<string, unknown>) => {
    try {
        const config: AxiosRequestConfig = {
            params
        };
        // const response = await axios.get(`http://192.168.30.204:8080/${url}`, config);
        const response = await axios.get(`https://semony-s109.site/api/${url}`, config);
        return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) {
          throw new Error(err.message);
        } else {
          throw new Error('An unknown error occurred');
        }
      }
};

export default request;