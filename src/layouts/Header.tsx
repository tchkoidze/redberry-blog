import logo from "../assets/images/LOGO.png";

const Header = (props: { setOpen: (bool: boolean) => void }) => {
  return (
    <header className="flex items-center justify-between h-[80px] mx-[76px]">
      <img src={logo} alt="logo" />
      <button
        onClick={() => props.setOpen(true)}
        className="flex items-center justify-center w-[93px] h-[40px] text-white text-base  font-medium line-loose rounded-md bg-blue-magenta px-5 py-2.5"
      >
        შესვლა
      </button>
    </header>
  );
};

export default Header;
