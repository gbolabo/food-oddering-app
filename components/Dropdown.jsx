import Image from "next/image";
import styles from "../styles/Dropdown.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

const Dropdown  = ({ loggedin }) => {
    
    const user = useSelector((state) => state.user).currentUser || null;

    useEffect(()=> {
      if(user!==null){
        setLogin(true);
      }
    },[]);
  
   
    const [login, setLogin] = useState(false);
    const [clicked, setClicked] = useState(false);
  



    const handleclick = () =>{
        console.log(clicked);
         setClicked(!clicked);
         console.log(clicked);
       }
      
       


       if (login===true)
       {
        return(<ul onClick={handleclick}
        className={clicked ===false ? styles.Dropdown :styles.Dropdownclicked}
        >
            
            <Link href="/account" passHref > 
              <li className={styles.listItem} onClick={()=>setClicked(false)}>Account</li>
            </Link>
            <Link href="/" passHref > 
              <li className={styles.listItem} onClick={()=>setClicked(false)}>Logout</li>
            </Link>
  
        </ul>)
     }else{
        return( <ul onClick={handleclick}
         className={clicked ===false ? styles.Dropdown :styles.Dropdownclicked}
         >
             
             <Link href="/" passHref > 
               <li className={styles.listItem} onClick={()=>setClicked(false)}>Login</li>
             </Link>
             <Link href="/" passHref > 
               <li className={styles.listItem} onClick={()=>setClicked(false)}>Register</li>
             </Link>
   
         </ul> )
     }
  };
  
  export default Dropdown;

