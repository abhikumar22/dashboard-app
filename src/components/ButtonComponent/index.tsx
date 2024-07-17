import "./index.scss";

const ButtonComponent = ({ text, onClickCbc, isDisabled }) => {    
  return (
    <div
    //   onClick={() => (!!isDisabled ? onClickCbc : null)}
      onClick={onClickCbc}
      className={`Button_Wrapper ${isDisabled ? `inActive` : ``}`}
    >
      {text}
    </div>
  );
};

export default ButtonComponent;
