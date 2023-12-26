import backArrow from "../assets/images/Arrow-left.svg";
//import Select from "react-select";
import AsyncSelect from "react-select/async";

import logo from "../assets/images/LOGO.png";
import axios from "axios";
import Dropzone from "react-dropzone";
import ImgAdd from "../svg/Img-add";
import UploadedIcon from "../svg/Uploaded-icon";
import { useEffect, useState } from "react";
import Close from "../svg/Close";
import { useForm } from "react-hook-form";
import { BlogForm } from "../types";

const BlogData: BlogForm = {
  dropzone_file: null,
  author: "",
  header: "",
  date: ",",
  category_options: [],
  email: "",
};

const AddBlog = () => {
  const [data, setData] = useState(BlogData);
  const token =
    "f7762c8a3f35e7996c89db12e3d96eb9c761316b407aafb56d6515c958c8319b";

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields, isValid },
  } = useForm({
    /* mode: "onChange"*/
  });
  const handleImageUpload = (acceptedFiles: any) => {
    // Assuming you want to handle only one file
    const uploadedFile = acceptedFiles[0];
    console.log(acceptedFiles[0].path);
    setUploadedImage(uploadedFile);
  };

  const onSubmit = () => {
    console.log("good");
  };
  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  const loadOptions = async () => {
    try {
      // Use Axios to fetch options from a remote source (e.g., an API) based on the inputValue
      const response = await axios.get(
        "https://api.blog.redberryinternship.ge/api/categories"
      );

      // Call the callback with the fetched options
      //return response.data.data;
      const formattedOptions = response.data.data.map((category: any) => ({
        label: category.title,
        value: category.id,
        style: {
          color: category.text_color,
          backgroundColor: category.background_color,
        },
      }));
      return formattedOptions;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching options:", error);
    }
  };

  /*useEffect(() => {
    //JSON.parse(localStorage.getItem("data"));
    const storedData = localStorage.getItem("data");
    const parsedData = storedData ? JSON.parse(storedData) : null;

    //setData(parsedData);
    setData(parsedData || BlogData);
  }, []);*/
  const storedData = JSON.parse(localStorage.getItem("data")!);
  useEffect(() => {
    if (storedData) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    if (storedData) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  // Update author in state and localStorage as the user types
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const authorValue = e.target.value;
    console.log(868);
    setData((prevData) => ({ ...prevData, author: authorValue }));
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  return (
    <div>
      <header className="flex items-center justify-center h-[80px] ">
        <img src={logo} alt="logo" />
      </header>

      <img src={backArrow} alt="back arrow" className="absolute left-[76px]" />
      <div>
        <div className="pl-[600px] pr-[720px]">
          <h1 className="text-black font-bold text-[32px] leading-10 mb-10">
            ბლოგის დამატება
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-[600px]"
          >
            <div>
              <p className="text-black font-medium text-sm leading-5 mb-2">
                ატვირთეთ ფოტო
              </p>
              {uploadedImage ? (
                <div className="flex items-center justify-between rounded-xl bg-[#F2F2FA] p-4">
                  <div className="flex items-center gap-3">
                    <UploadedIcon />
                    <span className="text-black font-normal text-sm">
                      {uploadedImage?.name}
                    </span>
                  </div>
                  <button onClick={handleRemoveImage}>
                    <Close />
                  </button>
                </div>
              ) : (
                <Dropzone onDrop={handleImageUpload}>
                  {({ getRootProps, getInputProps, acceptedFiles }) => (
                    <section>
                      <div
                        {...getRootProps()}
                        className="flex items-center justify-center w-[600px] h-[180px] border border-default-input-grey border-dashed rounded-xl cursor-pointer bg-blue-default hover:bg-[#F1EFFB]"
                      >
                        <input
                          {...getInputProps()}
                          name="dropzone_file"
                          id="dropzone_file"
                          className="bg-red-200"
                        />

                        <div className="flex flex-col items-center justify-center gap-6">
                          <ImgAdd />
                          <p className="font-normal text-sm text-black">
                            ჩააგდეთ ფაილი აქ ან{" "}
                            <span className="font-medium underline">
                              აირჩიეთ ფაილი
                            </span>
                          </p>
                        </div>
                        {acceptedFiles ? (
                          <p>
                            {acceptedFiles.map((file) => (
                              <li key={file.name}>
                                {file.name} - {file.size} bytes
                              </li>
                            ))}
                          </p>
                        ) : null}
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
            </div>
            <div className="flex gap-6 ">
              <div className=" w-6/12 ">
                <label
                  className="text-black font-medium text-sm leading-5 block mb-2"
                  htmlFor="author"
                >
                  ავტორი *
                </label>
                <input
                  defaultValue={data.author}
                  onClick={() => {
                    console.log(errors.author);
                  }}
                  {...register("author", {
                    required: "required",
                    minLength: { value: 4, message: "Age must be at least 4" },
                    pattern: {
                      value: /^(\S+\s+){1,}\S+$/,
                      message: "Must contain at least two words",
                    },
                    validate: {
                      georgianAlphabet: (value) => {
                        // Replace this regex with the appropriate Georgian alphabet regex
                        const georgianAlphabetRegex = /^[ა-ჰ\s]+$/;
                        return (
                          georgianAlphabetRegex.test(value) ||
                          "Must contain only Georgian alphabet characters"
                        );
                      },
                    },
                    onChange: handleAuthorChange,
                  })}
                  id="author"
                  name="author"
                  type="text"
                  placeholder="შეიყვნეთ ავტორი"
                  className={`border border-grey outline-none focus:border-blue-magenta ${
                    dirtyFields.author && errors.author
                      ? " focus:border-red-300"
                      : " focus:border-green-300"
                  } bg-grey-bg rounded-xl placeholder-default-input-grey text-black font-normal text-sm px-4 py-3 w-full mb-2`}
                />
                <ul className="list-inside list-disc text-default-input-grey font-normal text-xs leading-5">
                  <li
                    className={`text-black ${
                      dirtyFields.author &&
                      (errors.author?.type === "minLength" &&
                      errors.author?.message === "Age must be at least 4"
                        ? "text-red-300"
                        : "text-green-300")
                    }`}
                  >
                    მინიმუმ 4 სიმბოლო
                  </li>
                  <li
                    className={`text-black ${
                      dirtyFields.author &&
                      (errors.author?.type === "pattern" &&
                      errors.author?.message ===
                        "Must contain at least two words"
                        ? "text-red-300"
                        : "text-green-300")
                    }`}
                  >
                    მინიმუმ ორი სიტყვა
                  </li>
                  <li
                    className={`text-black ${
                      dirtyFields.author &&
                      (errors.author?.type === "georgianAlphabet" &&
                      errors.author?.message ===
                        "Must contain only Georgian alphabet characters"
                        ? "text-red-300"
                        : "text-green-300")
                    }`}
                  >
                    მხოლოდ ქართული სიმბოლოები
                  </li>
                </ul>
              </div>
              <div className="w-6/12">
                <label
                  className="text-black font-medium text-sm leading-5 block mb-2"
                  htmlFor="header"
                >
                  სათური *
                </label>
                <input
                  {...(register("header"),
                  {
                    onChange: (e) =>
                      handleInputChange("header", e.target.value),
                  })}
                  name="header"
                  id="header"
                  type="text"
                  placeholder="შეიყვნეთ სათაური"
                  className="border border-grey bg-grey-bg rounded-xl placeholder-default-input-grey text-black font-normal text-sm px-4 py-3 w-full mb-2"
                />
                <p className="text-default-input-grey font-normal text-xs leading-5">
                  მინიმუმ 2 სიმბოლო
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="text-black font-medium text-sm leading-5 block mb-2"
              >
                აღწერა *
              </label>
              <textarea
                {...(register("description"),
                {
                  onChange: (e) =>
                    handleInputChange("description", e.target.value),
                })}
                name="description"
                id="description"
                placeholder="შეიყვნეთ აღწერა"
                className="w-full h-[124px] placeholder-default-input-grey text-black font-normal text-sm border border-grey rounded-xl bg-grey-bg py-3 px-4 resize-none focus:outline-none"
              ></textarea>
              <p className="text-default-input-grey font-normal text-xs leading-5">
                მინიმუმ 2 სიმბოლო
              </p>
            </div>
            <div className="flex gap-6">
              <div className=" w-6/12">
                <label
                  htmlFor="date"
                  className="text-black font-medium text-sm block mb-2"
                >
                  გამოქვეყნების თარიღი *
                </label>
                <input
                  {...(register("date"),
                  {
                    onChange: (e) => handleInputChange("date", e.target.value),
                  })}
                  type="date"
                  id="date"
                  name="date"
                  className="h-[44px] border border-grey bg-grey-bg rounded-xl  text-black font-normal text-sm px-4 py-3 w-full"
                />
              </div>
              <div className=" w-6/12 ">
                <p className="text-black font-medium text-sm block mb-2">
                  კატეგორია *
                </p>
                <AsyncSelect
                  placeholder="აირჩიეთ კატეგორია"
                  className="w-full text-purple-400"
                  loadOptions={loadOptions}
                  isMulti
                  cacheOptions
                  defaultOptions
                  getOptionLabel={(option: { label: string; value: string }) =>
                    option.label
                  }
                  getOptionValue={(option: { value: string }) => option.value}
                  styles={{
                    option: (provided, state) => {
                      const optionStyle: { [key: string]: any } = {
                        ...provided,
                        color: (state.data as any)?.style?.color,
                        backgroundColor: (state.data as any)?.style
                          ?.backgroundColor,
                      };
                      return optionStyle;
                    },
                  }}
                />
              </div>
            </div>
            <div className="w-6/12">
              <label
                htmlFor="email"
                className="text-black font-medium text-sm block mb-2"
              >
                ელ-ფოსტა
              </label>
              <input
                {...(register("email"),
                {
                  onChange: (e) => handleInputChange("email", e.target.value),
                })}
                type="text"
                id="email"
                placeholder="Example@redberry.ge"
                className="border border-grey bg-grey-bg rounded-xl placeholder-default-input-grey text-black font-normal text-sm px-4 py-3 w-full mb-2"
              />
            </div>
            <div>
              <button className="w-[288px] text-white font-medium text-sm block bg-blue-magenta px-5 py-2.5 rounded-lg ml-auto mt-4">
                გამოქვეყნება
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;

/*
                      dirtyFields.author &&
                      (errors.author?.type === "minLength" &&
                      errors.author?.message === "Age must be at least 4"
                        ? "text-red-300"
                        : "text-green-300")
                    */
