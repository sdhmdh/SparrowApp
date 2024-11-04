import axios from "axios";

const sparrowServer = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://sparrowserver.onrender.com/",
});

export default sparrowServer;
