import axios from 'axios';
import { useContext } from 'react';
import appContext from '../../context/AppContext';

const token = localStorage.getItem("token");
const {url}=useContext(appContext)
const instance = axios.create({
  baseURL: `${url}`,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default instance;
