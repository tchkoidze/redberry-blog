import { SubmitHandler, useForm } from "react-hook-form";
import cross from "../assets/images/cross.png";
import axios from "axios";

import error from "../assets/images/error.png";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

type Input = {
  email: string;
};

const Login = (props: { setOpen: (bool: boolean) => void }) => {
  const [requestError, setRequestError] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  console.log(requestError);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Input>();

  const text = {
    btn: "კარგი",
    msg: "წარმატებული ავტორიზაცია",
  };

  const token =
    "f7762c8a3f35e7996c89db12e3d96eb9c761316b407aafb56d6515c958c8319b";

  const onSubmit: SubmitHandler<Input> = async (data) => {
    console.log("Submitted email:");
    try {
      const response = await axios.post(
        "https://api.blog.redberryinternship.ge/api/login",
        { email: data.email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(errors.email?.message);

      if (response.status >= 200 && response.status < 300) {
        console.log("Login successful");
        setRequestError(false);
        setValid(true);
        console.log(response);
      } else {
        // Handle other status codes (optional)
        console.log("Login failed with status:", response.status);
      }

      if (response.status === 422) {
        console.log(requestError);
        setRequestError(true);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 422) {
        setRequestError(true);
        console.log(requestError);
      }
    }
  };

  return (
    <>
      {!valid ? (
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
              <form className="px-6 pb-10" onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("email", {
                      required: "მიუთითე მეილი",
                      pattern: {
                        value: /.+@redberry\.ge$/,
                        message: "მეილი უნდა მთავრდებოდეს @redberry.ge-ით",
                      },
                    })}
                    className={`text-black rounded-xl outline-none border border-grey font-normal text-sm leading-5  bg-grey-bg px-4 py-3 hover:bg-grey-hover focus:border-blue-magenta focus:border-[1.5px] focus:bg-blue-focused ${
                      errors.email || requestError
                        ? "bg-red-bg border-red-txt focus:border-red-txt"
                        : null
                    }`}
                  />
                  {errors.email ? (
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-normal leading-5 text-red-txt">
                        {errors.email.message}
                      </p>
                    </div>
                  ) : null}
                  {requestError ? (
                    <div className="flex items-center gap-2">
                      <img src={error} alt="error-img" />
                      <p className="text-xs font-normal leading-5 text-red-txt">
                        ელ-ფოსტა არ მოიძებნა
                      </p>
                    </div>
                  ) : null}
                </div>

                <button className="w-full text-white font-medium text-sm leading-5 rounded-lg bg-blue-magenta py-2.5 mt-6">
                  შესვლა
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <SuccessModal text={text} setOpen={props.setOpen} />
      )}
    </>
  );
};

export default Login;
