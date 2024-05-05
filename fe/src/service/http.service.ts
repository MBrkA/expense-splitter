import axios from "axios";
function useHttp(port: number) {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:" + port,
  });

  axiosInstance.interceptors.response.use((response) => response);
  return axiosInstance;
}

export { useHttp };
