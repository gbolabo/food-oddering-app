import { useState } from "react";
import { useEffect } from "react";
import styles from "../styles/OrderDetail.module.css";
import { useDispatch, useSelector } from "react-redux"

const OrderDetail = ({ total, createOrder }) => {
  const user = useSelector((state) => state.user).currentUser || null;

  useEffect(() => {
   console.log(user);
   setUserId(user._id); 
   
    setAddress(user.Address);
    setLastname(user.lastname);
    setFirstname(user.firstname);
  }, []);


  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userId, setUserId] = useState("");

  console.log(userId);

  const handleClick = () => {
    createOrder({ userId,customer, address, total, method: 0 });
  };

  return (

    
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay $12 after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Full Name</label>
          <input
            placeholder="John Doe"
            type="text"
            value = {`${firstname}  ${lastname}`}
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            value={address}
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
