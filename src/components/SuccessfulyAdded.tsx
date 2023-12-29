import tick from "../assets/images/tick-circle.png";
import cross from "../assets/images/cross.png";
import { useNavigate } from "react-router-dom";

const SuccessPopup = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full h-screen absolute top-0 bg-bg-black ">
      <div className="w-[480px] bg-white rounded-xl">
        <div className="pt-5 pr-5">
          <img
            src={cross}
            alt="cross"
            className="ml-auto rounded-[30px] hover:bg-[#F5F4F9] active:bg-[#EBEAEF]"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="px-6 pt-5 pb-10">
          <img src={tick} alt="tick" className="mx-auto" />
          <h2 className="text-black  text-center font-bold text-xl mt-4">
            ჩანაწი წარმატებით დაემატა
          </h2>
          <button
            onClick={() => navigate("/")}
            className="w-full text-white font-medium text-sm leading-5 rounded-lg bg-blue-magenta py-2.5 mt-12"
          >
            მთავარ გვერდზე დაბრუნება
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
