import tick from "../assets/images/tick-circle.png";
import cross from "../assets/images/cross.png";

type TextObject = {
  btn: string;
  msg: string;
};

type SuccessModalProps = {
  text: TextObject;
  setOpen: (bool: boolean) => void;
};
//props: { text: TextObject }
const SuccessModal = (props: SuccessModalProps) => {
  return (
    <div className="flex items-center justify-center w-full h-screen absolute top-0 bg-bg-black ">
      <div className="w-[480px] bg-white rounded-xl">
        <div className="pt-5 pr-5">
          <img
            src={cross}
            alt="cross"
            className="ml-auto rounded-[30px] hover:bg-[#F5F4F9] active:bg-[#EBEAEF]"
            onClick={() => props.setOpen(false)}
          />
        </div>
        <div className="px-6 pt-5 pb-10">
          <img src={tick} alt="tick" className="mx-auto" />
          <h2 className="text-black  text-center font-bold text-xl mt-4">
            {props.text.msg}
          </h2>
          <button
            onClick={() => props.setOpen(false)}
            className="w-full text-white font-medium text-sm leading-5 rounded-lg bg-blue-magenta py-2.5 mt-12"
          >
            {props.text.btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
