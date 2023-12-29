import { useNavigate } from "react-router-dom";
import logo from "../assets/images/LOGO.png";

const Header = (props: {
  setOpen: (bool: boolean) => void;
  loged: React.MutableRefObject<boolean>;
  isLoged: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between h-[80px] mx-[76px]">
      <img src={logo} alt="logo" />
      {props.isLoged ? (
        <button
          onClick={() => navigate("/addBlog")}
          className="inline-flex items-center justify-center  h-[40px] text-white text-base  font-medium line-loose rounded-md bg-blue-magenta px-5 py-2.5"
        >
          დაამატე ბლოგი
        </button>
      ) : (
        <button
          onClick={() => props.setOpen(true)}
          className="flex items-center justify-center w-[93px] h-[40px] text-white text-base  font-medium line-loose rounded-md bg-blue-magenta px-5 py-2.5"
        >
          შესვლა
        </button>
      )}
    </header>
  );
};

export default Header;
