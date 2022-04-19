import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";
import { useEffect} from "react";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(()=> {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    console.log(user);
    const isAdmin = user?.isAdmin;
    console.log(isAdmin);
    if (isAdmin === true )
    {
      router.push("/admin");
    }
  },[]);

  const handleClick = async () => {
    
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
     if(res.data.isAdmin) { 
       
      console.log(res.data)
  const user = res.data;
  localStorage.setItem("user", JSON.stringify(user));

      router.push("/admin");
     }else{
       alert("Your are not an Admin User");
     };
      
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
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

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  // if (myCookie.token !== process.env.TOKEN) {
  //   if ( myCookie.token) {
  //   return {
  //     redirect: {
  //       destination: "/admin",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };

  
}
export default Login;
