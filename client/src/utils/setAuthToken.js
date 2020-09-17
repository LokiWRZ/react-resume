import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // headers: every requirement need to use it
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default setAuthToken;