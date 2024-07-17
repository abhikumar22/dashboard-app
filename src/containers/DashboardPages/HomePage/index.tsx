import { useLayoutEffect, useState } from "react";
import BRAND_IMAGE from "../../../assets/images/BRAND_IMAGE.png";
import "./index.scss";
import InputField from "../../../components/InputField";
import ButtonComponent from "../../../components/ButtonComponent";
import ConscentComponent from "../../../components/ConscentComponent";
import SelectComponent from "../../../components/SelectComponent";
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
  const navigate = useNavigate();

  useLayoutEffect(()=>{
    const isLoggedIn = localStorage.getItem("ACCESS_TOKEN");
    if(!(isLoggedIn&&isLoggedIn.length>0)){
      navigate('/login');
    }
  })
  const handleLogout = () =>{
    localStorage.clear('ACCESS_TOKEN')
    toast("Logging you out !! Redirecting to Login Page");
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }
  return (
    <div className="HomePage_Wrapper">
        Hello Homepage<button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;