import { useState, useLayoutEffect } from "react";
import BRAND_IMAGE from "../../../assets/images/BRAND_IMAGE.png";
import "./index.scss";
import InputField from "../../../components/InputField";
import ButtonComponent from "../../../components/ButtonComponent";
import ConscentComponent from "../../../components/ConscentComponent";
import SelectComponent from "../../../components/SelectComponent";
import { SIGNUP_FIELDS_TYPE, SIGNUP_FIELD_KEY } from "./constants";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [fieldsObj, setFieldsObj] = useState({});
  useLayoutEffect(()=>{
    const isLoggedIn = localStorage.getItem("ACCESS_TOKEN");
    if(!!(isLoggedIn&&isLoggedIn.length>0)){
      navigate('/');
    }
  })
  const navigateToLogin = () =>{
    navigate("/login");
  }

  const checkErrors = (fields) => {
    const requiredFields = Object.keys(SIGNUP_FIELD_KEY);

    // Check for missing or empty fields
    for (const field of requiredFields) {
      const currValue = fields[SIGNUP_FIELD_KEY[field]];
      const currKey = SIGNUP_FIELD_KEY[field];

      if (
        !fields.hasOwnProperty(currKey) ||
        (typeof currValue !== "boolean" && currValue.trim() === "")
      ) {
        return `The field "${currKey}" is mandatory and cannot be empty`;
      }
    }

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fields.email)) {
      return "The email format is invalid.";
    }

    // Check if password and confirmPassword match
    if (fields.password !== fields.confirmPassword) {
      return "Password and Confirm Password do not match.";
    }

    // Check if password is at least 8 characters long and strong
    if (fields.password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    // const strongPasswordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!strongPasswordRegex.test(fields.password)) {
    //   return "Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.";
    // }

    return true;
  };
  const handleFieldsChange = (data, type) => {
    switch (type) {
      case SIGNUP_FIELDS_TYPE.EMAIL:
        setFieldsObj({
          ...fieldsObj,
          email: data,
        });
        break;
      case SIGNUP_FIELDS_TYPE.USERNAME:
        setFieldsObj({
          ...fieldsObj,
          username: data,
        });
        break;
      case SIGNUP_FIELDS_TYPE.PASSWORD:
        setFieldsObj({
          ...fieldsObj,
          password: data,
        });
        break;

      case SIGNUP_FIELDS_TYPE.CONFIRM_PASSWORD:
        setFieldsObj({
          ...fieldsObj,
          confirmPassword: data,
        });
        break;
      case SIGNUP_FIELDS_TYPE.EMPLOYEE:
        setFieldsObj({
          ...fieldsObj,
          employee: data,
        });
        break;

      case SIGNUP_FIELDS_TYPE.COMPANY:
        setFieldsObj({
          ...fieldsObj,
          company: data,
        });
        break;

      case SIGNUP_FIELDS_TYPE.ACCOUNTING_SOFTWARE:
        setFieldsObj({
          ...fieldsObj,
          accountingSoftware: data,
        });
        break;

      case SIGNUP_FIELDS_TYPE.SIGNUP_CONFIRM_CHECKBOX:
        setFieldsObj({
          ...fieldsObj,
          confirmation: data,
        });
        break;

      default:
        break;
    }
  };
  const clickSignIn = () => {
    const hasNoErrorInFields = checkErrors(fieldsObj);
    if (!(typeof hasNoErrorInFields === "boolean" && hasNoErrorInFields)) {
      toast(hasNoErrorInFields);
      return;
    }
    callSignupUser();
  };

  const callSignupUser = async () => {
    const payload = {
      email: fieldsObj?.email,
      user_name: fieldsObj?.username,
      password: fieldsObj?.password,
      password_confirmation: fieldsObj?.confirmPassword,
      no_Of_employees: fieldsObj?.employee,
      company_name: fieldsObj?.company,
      application_type: fieldsObj?.accountingSoftware,
      term_and_condition: fieldsObj ? "1" : "0",
    };    
    try {
      const rawResponse = await fetch("http://50.18.93.202/api/v1/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const content = await rawResponse.json();
      if (content?.success === true) {
        toast("Registration Successfull, rediecting you to login page");
        setTimeout(() => {
          navigateToLogin();
        }, 2000);
      }
    } catch (error) {
      toast(`${error}`);
    }
  };

  return (
    <div className="SignUp_Wrapper">
      <div className="SignUp_Container">
        <div className="SignUp_Box">
          <div className="Brand_Image_Box">
            <img className="" src={BRAND_IMAGE} />
          </div>
          <div className="Title_Text">Sign Up</div>
          <div className="Subtitle_Container">
            <div className="Subtitle_text">
              Already have a Papercut account?
            </div>
            <div className="Signup_Navigation_text">
            <Link to="/login">Sign in</Link>
              </div>
          </div>
          <div className="Fields_Container">
            <div className="Fields_Box">
              <InputField
                handleChange={(data) =>
                  handleFieldsChange(data, SIGNUP_FIELDS_TYPE.EMAIL)
                }
                title={"Email"}
                placeholderText={"Enter Email"}
                type={"email"}
                customStyleInput={{
                  ".MuiInputBase-input": {
                    padding: "0.8em",
                  },
                }}
                customStyleLabel={{
                  fontSize: "12px",
                }}
                customStyleInputWrapper={{ margin: 0 }}
              />
              <InputField
                handleChange={(data) =>
                  handleFieldsChange(data, SIGNUP_FIELDS_TYPE.USERNAME)
                }
                title={"Username"}
                placeholderText={"Enter Username"}
                customStyleInput={{
                  ".MuiInputBase-input": {
                    padding: "0.8em",
                  },
                }}
                customStyleLabel={{
                  fontSize: "12px",
                }}
                customStyleInputWrapper={{ margin: 0 }}
              />
            </div>
            <div className="Fields_Box">
              <InputField
                handleChange={(data) =>
                  handleFieldsChange(data, SIGNUP_FIELDS_TYPE.PASSWORD)
                }
                title={"Password"}
                placeholderText={"Enter Password"}
                type={"password"}
                customStyleInput={{
                  ".MuiInputBase-input": {
                    padding: "0.8em",
                  },
                }}
                customStyleLabel={{
                  fontSize: "12px",
                }}
                customStyleInputWrapper={{ margin: 0 }}
              />
              <InputField
                handleChange={(data) =>
                  handleFieldsChange(data, SIGNUP_FIELDS_TYPE.CONFIRM_PASSWORD)
                }
                title={"Confirm Password"}
                placeholderText={"Confirm Password"}
                type={"password"}
                customStyleInput={{
                  ".MuiInputBase-input": {
                    padding: "0.8em",
                  },
                }}
                customStyleLabel={{
                  fontSize: "12px",
                }}
                customStyleInputWrapper={{ margin: 0 }}
              />
            </div>
            <div className="Fields_Box">
              <SelectComponent
                handleChange={(data) =>
                  handleFieldsChange(data, SIGNUP_FIELDS_TYPE.EMPLOYEE)
                }
                options={[
                  {
                    id: "1-3",
                    value: "1-3",
                  },
                  {
                    id: "4-10",
                    value: "11-25",
                  },
                  {
                    id: "11-25",
                    value: "11-25",
                  },
                  {
                    id: "26-50",
                    value: "26-50",
                  },
                  {
                    id: "50+",
                    value: "50+",
                  },
                ]}
                title={"Employee"}
                customStyleLabel={{
                  fontSize: "12px",
                }}
              />
              <InputField
                handleChange={(data) =>
                  handleFieldsChange(data, SIGNUP_FIELDS_TYPE.COMPANY)
                }
                title={"Company"}
                placeholderText={"Select"}
                customStyleInput={{
                  ".MuiInputBase-input": {
                    padding: "0.8em",
                  },
                }}
                customStyleLabel={{
                  fontSize: "12px",
                }}
                customStyleInputWrapper={{ margin: 0 }}
              />
            </div>
            <div className="Fields_Box">
              <SelectComponent
                handleChange={(data) =>
                  handleFieldsChange(
                    data,
                    SIGNUP_FIELDS_TYPE.ACCOUNTING_SOFTWARE
                  )
                }
                title={"Accounting Software"}
                options={[
                  {
                    id: "QuickBooks Desktop",
                    value: "QuickBooksDesktop",
                  },
                  {
                    id: "QuickBooksOnline",
                    value: "QuickBooks Online",
                  },
                  {
                    id: "Xero",
                    value: "Xero",
                  },
                  {
                    id: "Freshbooks",
                    value: "Freshbooks",
                  },
                  {
                    id: "Inaact",
                    value: "Inaact",
                  },
                  {
                    id: "Sage",
                    value: "Wave",
                  },
                  {
                    id: "NetSuite",
                    value: "NetSuite",
                  },
                  {
                    id: "Other",
                    value: "Other",
                  },
                ]}
                customStyleLabel={{
                  fontSize: "12px",
                }}
              />
            </div>
          </div>
          <ConscentComponent
            handleChange={(data) =>
              handleFieldsChange(
                data,
                SIGNUP_FIELDS_TYPE.SIGNUP_CONFIRM_CHECKBOX
              )
            }
            title={
              <div>
                I have read to the{" "}
                <a
                  style={{ textDecoration: "underline", fontWeight: 700 }}
                  href="https://www.w3schools.com"
                  target="blank"
                >
                  Terms & Conditions
                </a>{" "}
                & I agree to it.
              </div>
            }
          />
          <ButtonComponent
            isDisabled={false}
            text={"Sign in"}
            onClickCbc={() => clickSignIn()}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
