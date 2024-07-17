import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import BRAND_IMAGE from "../../../assets/images/BRAND_IMAGE.png";
import InputField from "../../../components/InputField";
import ButtonComponent from "../../../components/ButtonComponent";
import ConscentComponent from "../../../components/ConscentComponent";
import { LOGIN_FIELDS_TYPE, LOGIN_FIELD_KEY } from "./constants";
import "./index.scss";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Login = () => {
  const [fieldsObj, setFieldsObj] = useState({});
  const navigate = useNavigate();

  useLayoutEffect(()=>{
    const isLoggedIn = localStorage.getItem("ACCESS_TOKEN");
    if(!!(isLoggedIn&&isLoggedIn.length>0)){
      navigate('/');
    }
  })

  const navigateToLogin = () => {
    navigate("/login");
  };
  const checkErrors = (fields) => {
    const requiredFields = Object.keys(LOGIN_FIELD_KEY);

    // Check for missing or empty fields
    for (const field of requiredFields) {
      const currValue = fields[LOGIN_FIELD_KEY[field]];
      const currKey = LOGIN_FIELD_KEY[field];

      if (
        !fields.hasOwnProperty(currKey) ||
        (typeof currValue !== "boolean" && currValue.trim() === "")
      ) {
        return `The field "${currKey}" is mandatory and cannot be empty`;
      }
    }

    return true;
  };
  const handleFieldsChange = (data, type) => {
    switch (type) {
      case LOGIN_FIELDS_TYPE.USERNAME:
        setFieldsObj({
          ...fieldsObj,
          username: data,
        });
        break;
      case LOGIN_FIELDS_TYPE.PASSWORD:
        setFieldsObj({
          ...fieldsObj,
          password: data,
        });
        break;
      case LOGIN_FIELDS_TYPE.REMEMBER_ME:
        setFieldsObj({
          ...fieldsObj,
          rememberMe: data,
        });
        break;

      default:
        break;
    }
  };
  const handleLoginBtn = () => {
    const hasNoErrorInFields = checkErrors(fieldsObj);
    if (!(typeof hasNoErrorInFields === "boolean" && hasNoErrorInFields)) {
      toast(hasNoErrorInFields);
      return;
    }
    callLoginUser();
  };

  const callLoginUser = async () => {
    const payload = {
      user_name: fieldsObj?.username,
      password: fieldsObj?.password,
    };
    try {
      const rawResponse = await fetch("http://50.18.93.202/api/v1/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const content = await rawResponse.json();
      if (content?.status === true) {
        localStorage.setItem("ACCESS_TOKEN", content?.result?.accessToken);
        toast("Login Successfull, rediecting you to homepage");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }else{
        toast(content?.message);
      }
    } catch (error) {
      toast(`${error}`);
    }
  };

  console.log("******* &&&&&&&", fieldsObj);

  return (
    <div className="Login_Wrapper">
      <div className="Login_Container">
        <div className="Login_Box">
          <div className="Brand_Image_Box">
            <img className="" src={BRAND_IMAGE} />
          </div>
          <div className="Title_Text">Sign in</div>
          <div className="Subtitle_Container">
            <div className="Subtitle_text">
              Don’t have a Papercut account yet?
            </div>
            <div className="Signup_Navigation_text">
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
          <div className="Fields_Box">
            <InputField
              handleChange={(data) =>
                handleFieldsChange(data, LOGIN_FIELDS_TYPE.USERNAME)
              }
              title={"Username"}
              placeholderText={"Enter Username"}
              customStyle={{
                ".MuiInputBase-input": {
                  padding: "1em 1.2em",
                },
              }}
            />
            <InputField
              handleChange={(data) =>
                handleFieldsChange(data, LOGIN_FIELDS_TYPE.PASSWORD)
              }
              title={"Password"}
              placeholderText={"Your Password"}
              type={"password"}
              customStyle={{
                ".MuiInputBase-input": {
                  padding: "0.9em 1em",
                },
              }}
            />
          </div>

          <ConscentComponent
            handleChange={(data) =>
              handleFieldsChange(data, LOGIN_FIELDS_TYPE.REMEMBER_ME)
            }
            title={"Remember Me"}
          />

          <ButtonComponent
            onClickCbc={() => handleLoginBtn()}
            text={"Sign in"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
