import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";


export const login = async (dispatch, user,setLoginopen) => {
  dispatch(loginStart());
  try {
      console.log(user);
    const res = await axios.post("http://localhost:3000/api/login",user);
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(loginSuccess(res.data));
      return setLoginopen(false);    
  } catch (err) {
    dispatch(loginFailure());
  }
};
