/* eslint-disable no-console */
import axios from 'axios';

export const BASE_URL: string = 'https://test-front.framework.team';
export enum AddressesRequests {
  PAINTINGS = '/paintings',
  AUTHORS = '/authors',
  LOCATIONS = '/locations',
}

// Hook for server requests
const useHttp = () => {
  const request = async (
    url: string,
    method: string,
    headers: object,
    data?: object,
    id?: string,
  ): Promise<object | object[] | undefined> => {
    try {
      const res = await axios({
        url: `${BASE_URL}${url}${id || ''}`,
        method,
        headers,
        data,
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.errorText, 'error');
      } else if (error instanceof Error) {
        console.log(error.message);
      }
      return undefined;
    }
  };

  return {
    request,
  };
};

export default useHttp;
