import Axios from 'axios';
import * as Config from "../../config";
import store from "../../store";

const API_ROOT = "";

const backendUnAuthInstance = Axios.create({
    baseURL: `${Config.BACKEND_API_URL}${API_ROOT}`,
  });

  backendUnAuthInstance.interceptors.request.use(function (config) {
    let state = store.getState();
    return config;
  });

export default backendUnAuthInstance;
