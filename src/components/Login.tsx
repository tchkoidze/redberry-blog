import cross from "../assets/images/cross.png";

const Login = (props: { setOpen: (bool: boolean) => void }) => {
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
        <div>
          <h2 className="text-black  text-center font-bold text-2xl leading-8 mb-6">
            შესვლა
          </h2>
          <form className="px-6 pb-10">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-black font-medium text-sm leading-5"
              >
                ელ-ფოსტა
              </label>
              <input
                id="email"
                type="text"
                placeholder="Example@redberry.ge"
                className="text-[#85858D] rounded-xl outline-blue-magenta font-normal text-sm leading-5  bg-[#F7F7FF] px-4 py-3"
              />
            </div>

            <button className="w-full text-white font-medium text-sm leading-5 rounded-lg bg-blue-magenta py-2.5 mt-6">
              შესვლა
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
