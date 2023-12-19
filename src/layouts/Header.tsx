import logo from "../assets/images/LOGO.png";

const Header = () => {
  return (
    <header className="flex items-center gap-[1045px] h-[80px] mx-[316px]">
      <img src={logo} alt="logo" />
      <button className="flex items-center justify-center w-[93px] h-[40px] text-white text-base  font-medium line-loose rounded-md bg-blue-magenta px-5 py-2.5">
        შესვლა
      </button>
    </header>
  );
};

export default Header;
