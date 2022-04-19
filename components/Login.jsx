import { useState } from "react";
import styles from "../styles/userLogin.module.css";
import { useRouter } from "next/router";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";

const Login = ({setLoginopen}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
   console.log(error);
    const router = useRouter();

    // useEffect(()=> {
    //     const user = JSON.parse(localStorage.getItem("user")) || null;
    //     console.log(user);
    //     const isAdmin = user?.isAdmin;
    //     console.log(isAdmin);
    //     if (isAdmin === true )
    //     {
    //       router.push("/admin");
    //     }
    //   },[]);
    
    
    const handleClick = (e) => {
      e.preventDefault();
      login(dispatch, { email, password },setLoginopen);
      
    };
      
      return (
        <div className={styles.container}>
          <div className={styles.wrapper}>
          <span onClick={() => setLoginopen(false)} className={styles.close}>
          X
        </span>
            <h1>Login</h1>
            <input
              placeholder="email"
              className={styles.input}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="password"
              type="password"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick} className={styles.button}>
              Sign In
            </button>
            {error && <span className={styles.error}>Wrong Credentials!</span>}
          </div>
        </div>
      );
    };
    
    // export const getServerSideProps = async (ctx) => {
    //   const myCookie = ctx.req?.cookies || "";
    
    //   // if (myCookie.token !== process.env.TOKEN) {
    //   //   if ( myCookie.token) {
    //   //   return {
    //   //     redirect: {
    //   //       destination: "/admin",
    //   //       permanent: false,
    //   //     },
    //   //   };
    //   // }
    
    //   return {
    //     props: {},
    //   };
    
      
    // }
    export default Login;
    