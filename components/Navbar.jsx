import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./Dropdown";

// import your icons

import { faTimes, faBars,faUser,faCaretDown } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);


 

  const [clicked, setClicked] = useState(false);
  const [dropdown, setDropdown] = useState(false);
 


 const handleclick = () =>{
   console.log(clicked);
    setClicked(!clicked);
    console.log(clicked);
  }

  const closeMobileMenu =()=>{
    setClicked(false);
  }
  const handleDropdown = () =>{
    setDropdown(!dropdown)
     
  }

  

  // const onMouseLeave =()=>{
  //   if(window.innerWidth<960){
  //     setDropdown(false);
  //   }else{
  //     setDropdown(false);
  //   }
  // }


  return (
    
    <div className={styles.container}>
      {!clicked && <div className={styles.item}>
      
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
         <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>

      </div>}
      <div className={styles.menuicon} onClick={handleclick}>
       {clicked ===false ? <FontAwesomeIcon icon={faBars}/>: <FontAwesomeIcon icon={faTimes}/>}
      </div>
      <div className={styles.item}>
        <ul className={clicked ===false ? styles.list :styles.listactive} >
          <Link href="/" passHref > 
            <li className={styles.listItem} onClick={closeMobileMenu}>Homepage</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          {/* <Image src="/img/logo.png" alt="" width="160px" height="69px" /> */}
          <li className={styles.title}>PIZZA PLACE</li>
          {/* <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li> */}
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      
        <div className={styles.item}>
        <Link href="/cart" passHref onClick={closeMobileMenu}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
          </Link>

          <div className={styles.profile} onClick={handleDropdown}  >
          <FontAwesomeIcon icon={faUser}/>
          <FontAwesomeIcon icon={faCaretDown}/>
          {dropdown && <Dropdown />}
          </div>
        </div>
      
    </div>
  );
};

export default Navbar;
