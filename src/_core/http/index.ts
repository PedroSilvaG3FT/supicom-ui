import axios, { CreateAxiosDefaults } from "axios";

function _buildInstance<Data>(
  baseURL: string,
  config: CreateAxiosDefaults<Data> = {}
) {
  return axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    ...config,
  });
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const APP_HTTP_CLIENT = _buildInstance(API_URL);
export const LOCAL_HTTP_CLIENT = _buildInstance("");

APP_HTTP_CLIENT.interceptors.request.use(
  async (config) => {
    config.headers["Authorization"] = `Bearer `;
    return config;
  },
  (error) => Promise.reject(error)
);

APP_HTTP_CLIENT.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response && error?.response?.status === 307) {
      const redirectUrl = error?.response?.headers?.location;

      const config = {
        ...error?.config,
        url: redirectUrl,
        baseURL: "",
      };

      try {
        const redirectedResponse = await axios(config);
        return redirectedResponse;
      } catch (redirectError) {
        return Promise.reject(redirectError);
      }
    }

    return Promise.reject(error);
  }
);
