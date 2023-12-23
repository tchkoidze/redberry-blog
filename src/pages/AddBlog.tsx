import backArrow from "../assets/images/Arrow-left.svg";
//import Select from "react-select";
import AsyncSelect from "react-select/async";

import logo from "../assets/images/LOGO.png";
import axios from "axios";
import Dropzone from "react-dropzone";
import ImgAdd from "../svg/Img-add";
import UploadedIcon from "../svg/Uploaded-icon";
import { useState } from "react";
import Close from "../svg/Close";

const AddBlog = () => {
  const token =
    "f7762c8a3f35e7996c89db12e3d96eb9c761316b407aafb56d6515c958c8319b";

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageUpload = (acceptedFiles: any) => {
    // Assuming you want to handle only one file
    const uploadedFile = acceptedFiles[0];
    console.log(acceptedFiles[0].path);
    setUploadedImage(uploadedFile);
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
          <form action="" className="flex flex-col gap-6 w-[600px]">
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
                          id="dropzone-file"
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
                  id="author"
                  type="text"
                  placeholder="შეიყვნეთ ავტორი"
                  className="border border-grey bg-grey-bg rounded-xl placeholder-default-input-grey text-black font-normal text-sm px-4 py-3 w-full mb-2"
                />
                <ul className="list-inside list-disc text-default-input-grey font-normal text-xs leading-5">
                  <li>მინიმუმ 4 სიმბოლო</li>
                  <li>მინიმუმ ორი სიტყვა</li>
                  <li>მხოლოდ ქართული სიმბოლოები</li>
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
                name="description"
                id="describe"
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
                  type="date"
                  id="date"
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
