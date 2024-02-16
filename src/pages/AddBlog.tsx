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
import { useForm, Controller } from "react-hook-form";
import { BlogForm } from "../types";
import SuccessPopup from "../components/SuccessfulyAdded";
import { useNavigate } from "react-router-dom";

const BlogData: BlogForm = {
  dropzone_file: null,
  author: "",
  header: "",
  description: "",
  date: ",",
  category_options: [],
  email: "",
};

const AddBlog = () => {
  const [data, setData] = useState(BlogData);
  const [blogAdded, setBlogAdded] = useState(false);
  const [focus, setFocus] = useState(false);
  const [namelength, setNamelength] = useState(false);
  const [namepattern, setNamepattern] = useState(false);
  const [nameValidate, setNamevalidate] = useState(false);
  const navigate = useNavigate();
  const token =
    "f7762c8a3f35e7996c89db12e3d96eb9c761316b407aafb56d6515c958c8319b";

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    /*defaultValues: {
      dropzone_file: data.dropzone_file || null,
      author: data.author,
      header: data.header,
      description: data.description,
      date: data.date,
      category_options: data.category_options,
      email: data.email,
    },*/
    mode: "onChange",
  });
  const handleImageUpload = (acceptedFiles: any) => {
    // Assuming you want to handle only one file
    const uploadedFile = acceptedFiles[0];
    console.log(uploadedFile);

    const reader = new FileReader();
    reader.onload = () => {
      const result: string | null =
        typeof reader.result === "string" ? reader.result : null;

      if (result !== null) {
        /*const updatedData = {
          ...storedData,
          dropzone_file: reader,
        };*/

        setData((prevData) => ({ ...prevData, dropzone_file: result }));
      }
    };
    if (uploadedFile) {
      reader.readAsDataURL(uploadedFile);
    }

    setUploadedImage(uploadedFile);
  };

  function dataURLtoFile(dataurl: any, filename: any) {
    if (data.dropzone_file !== null) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    }
  }

  const onSubmit = () => {
    const file =
      typeof data.dropzone_file === "string"
        ? dataURLtoFile(data.dropzone_file, "upload_image")
        : data.dropzone_file;

    console.log("good");
    console.log(file);
    console.log(data.category_options.map((option) => option.value));
    const formData = new FormData();
    formData.append("author", data.author);
    formData.append("title", data.header);
    formData.append("description", data.description);
    formData.append("publish_date", data.date);
    const categories = JSON.stringify(
      data.category_options.map((option) => option.value)
    );
    console.log("category: ", categories);
    formData.append("categories", categories);
    formData.append("image", file || "");
    formData.append("email", data.email);
    console.log(formData.entries());
    console.log(formData.get("image"));
    for (const entry of formData.entries()) {
      console.log(`${entry[0]}: ${entry[1]}`);
    }
    axios
      .post("https://api.blog.redberryinternship.ge/api/blogs", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Handle the response as needed
        console.log("Response:", response);
        if (response.status >= 200 && response.status < 300) {
          setBlogAdded(true);
          localStorage.removeItem("data");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        console.error("Error Response:", error.response);
        console.error("Error:", error.message);
      });
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

  const storedData = JSON.parse(localStorage.getItem("data")!);
  useEffect(() => {
    if (storedData) {
      setData(storedData);
    }
    // Set default values after fetching from localStorage
    const defaultValues = {
      dropzone_file: storedData?.dropzone_file || null,
      author: storedData?.author || "",
      header: storedData?.header || "",
      description: storedData?.description || "",
      date: storedData?.date || "",
      category_options: storedData?.category_options || [],
      email: storedData?.email || "",
    };

    // Set default values in the form
    Object.entries(defaultValues).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  // Update author in state and localStorage as the user types
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const authorValue = e.target.value;
    console.log(868);
    console.log(errors);
    setData((prevData) => ({ ...prevData, author: authorValue }));
    if (authorValue.length >= 4) {
      setNamelength(true);
    } else {
      setNamelength(false);
    }
    const patternAuthor = /^(\S+\s+){1,}\S+$/;
    if (patternAuthor.test(authorValue)) {
      setNamepattern(true);
    } else {
      setNamepattern(false);
    }
    const georgianAlphabetRegex = /^[ა-ჰ\s]+$/;
    if (georgianAlphabetRegex.test(authorValue)) {
      setNamevalidate(true);
    } else {
      setNamevalidate(false);
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSelect = (fieldName: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      //[fieldName]: value,
      [fieldName]: Array.isArray(value) ? value : [value],
    }));
  };
  return (
    <>
      {blogAdded && <SuccessPopup />}
      <div>
        <header className="flex items-center justify-center h-[80px] ">
          <img src={logo} alt="logo" />
        </header>

        <img
          src={backArrow}
          alt="back arrow"
          className="absolute left-[76px]"
          onClick={() => {
            navigate("/");
            localStorage.removeItem("data");
          }}
        />
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
                  <Dropzone
                    /*onDrop={(acceptedFiles) => {
                    console.log(acceptedFiles);
                    handleImageUpload;
                  }}*/
                    onDrop={handleImageUpload}
                  >
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
                    onFocus={() => {
                      setFocus(true);
                      console.log(focus);
                    }}
                    onClick={() => {
                      if (errors.author) {
                        console.log(errors.author);
                      }
                    }}
                    {...register("author", {
                      //required: "required",
                      minLength: {
                        value: 4,
                        message: "Age must be at least 4",
                      },
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
                    //defaultValue={data.author}
                    id="author"
                    name="author"
                    type="text"
                    placeholder="შეიყვნეთ ავტორი"
                    className={`border border-grey outline-none focus:border-blue-magenta ${
                      dirtyFields.author && errors.author
                        ? " focus:border-red-300 border-red-300"
                        : dirtyFields.author
                        ? " focus:border-green-300 border-green-300"
                        : ""
                    } bg-grey-bg rounded-xl placeholder-default-input-grey text-black font-normal text-sm px-4 py-3 w-full mb-2`}
                  />
                  <ul className="list-inside list-disc text-default-input-grey font-normal text-xs leading-5">
                    <li
                      className={`text-black 
                      ${dirtyFields.author && !namelength && "text-red-400"}
                       ${dirtyFields.author && namelength && "text-green-300"}`}
                    >
                      მინიმუმ 4 სიმბოლო
                    </li>
                    <li
                      className={`text-black ${
                        dirtyFields.author && !namepattern && "text-red-300"
                      } ${
                        dirtyFields.author && namepattern && "text-green-300"
                      }`}
                    >
                      მინიმუმ ორი სიტყვა
                    </li>
                    <li
                      className={`text-black ${
                        dirtyFields.author && !nameValidate && "text-red-300"
                      } ${
                        dirtyFields.author && nameValidate && "text-green-300"
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
                    {...register("header", {
                      required: true,
                      minLength: 2,
                      onChange: (e) =>
                        handleInputChange("header", e.target.value),
                    })}
                    onClick={() => {
                      console.log(errors.header);
                      console.log(dirtyFields.header);
                    }}
                    //defaultValue={data.header}
                    name="header"
                    id="header"
                    type="text"
                    placeholder="შეიყვნეთ სათაური"
                    className={`border border-grey  outline-none focus:border-blue-magenta ${
                      dirtyFields.header && errors.header
                        ? " focus:border-red-300 border-red-300"
                        : dirtyFields.header
                        ? " focus:border-green-300 border-green-300"
                        : ""
                    } bg-grey-bg rounded-xl placeholder-default-input-grey text-black font-normal text-sm px-4 py-3 w-full  mb-2`}
                  />
                  <p
                    className={`text-default-input-grey ${
                      dirtyFields.header && errors.header
                        ? "text-red-300"
                        : dirtyFields.header
                        ? "text-green-300"
                        : ""
                    } font-normal text-xs leading-5`}
                  >
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
                  {...register("description", {
                    required: true,
                    minLength: 2,
                    onChange: (e) =>
                      handleInputChange("description", e.target.value),
                  })}
                  defaultValue={data.description}
                  name="description"
                  id="description"
                  placeholder="შეიყვნეთ აღწერა"
                  className={`w-full h-[124px] placeholder-default-input-grey text-black font-normal text-sm border border-grey focus:border-blue-magenta ${
                    dirtyFields.description && errors.description
                      ? " focus:border-red-300 border-red-300"
                      : dirtyFields.description
                      ? " focus:border-green-300 border-green-300"
                      : ""
                  } rounded-xl bg-grey-bg py-3 px-4 resize-none focus:outline-none`}
                ></textarea>
                <p
                  className={`text-default-input-grey ${
                    dirtyFields.description && errors.description
                      ? "text-red-300"
                      : dirtyFields.description
                      ? "text-green-300"
                      : ""
                  } font-normal text-xs leading-5`}
                >
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
                    {...register("date", {
                      required: true,
                      onChange: (e) =>
                        handleInputChange("date", e.target.value),
                    })}
                    value={data.date}
                    type="date"
                    id="date"
                    name="date"
                    className={`h-[44px] outline-none border border-grey focus:border-blue-magenta ${
                      dirtyFields.date && errors.date
                        ? " focus:border-red-300 border-red-300"
                        : dirtyFields.date
                        ? " focus:border-green-300 border-green-300"
                        : ""
                    } bg-grey-bg rounded-xl  text-black font-normal text-sm px-4 py-3 w-full`}
                  />
                </div>
                <div className=" w-6/12 ">
                  <p className="text-black font-medium text-sm block mb-2">
                    კატეგორია *
                  </p>
                  <Controller
                    name="category_options"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <AsyncSelect
                        {...field}
                        value={data.category_options}
                        placeholder="აირჩიეთ კატეგორია"
                        className="w-full text-purple-400"
                        loadOptions={loadOptions}
                        isMulti
                        cacheOptions
                        defaultOptions
                        getOptionLabel={(option: {
                          label: string;
                          value: string;
                        }) => option.label}
                        getOptionValue={(option: { value: string }) =>
                          option.value
                        }
                        onChange={(selectedOptions) => {
                          field.onChange(selectedOptions); // Update the form state
                          handleSelect("category_options", selectedOptions); // Update the data state
                        }}
                        //onChange={handleInputChange}
                        styles={{
                          control: (base: any) => ({
                            ...base,
                            borderRadius: "12px",
                            height: "44px",
                            backgroundColor: "#FCFCFD",
                            borderColor: `${
                              dirtyFields.category_options &&
                              errors.category_options
                                ? "#FF0000"
                                : dirtyFields.category_options
                                ? "#00FF00"
                                : "#E4E3EB"
                            }`, // Change this to the desired focused border color

                            outline: "none",
                          }),
                          valueContainer: (base: any) => ({
                            ...base,
                            overflowX: "auto",
                            flexWrap: "nowrap",

                            whiteSpace: "nowrap", // Prevent content from wrapping
                          }),

                          multiValue: (provided: any, state) => ({
                            ...provided,
                            whiteSpace: "nowrap", // Prevent multi values from wrapping to new lines
                            overflow: "hidden", // Hide any overflow
                            textOverflow: "ellipsis",
                            borderRadius: "30px",
                            color: (state.data as any)?.style.color,
                            backgroundColor: (state.data as any)?.style
                              ?.backgroundColor,
                            flex: "1 0 auto",
                          }),
                          multiValueLabel: (provided: any, state) => ({
                            ...provided,
                            color: (state.data as any)?.style.color,
                          }),
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
                    )}
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
                  {...register("email", {
                    pattern: {
                      value: /^$|.+@redberry\.ge$/,
                      message:
                        "Invalid email format or must end with @redberry.ge",
                    },
                    onChange: (e) => handleInputChange("email", e.target.value),
                  })}
                  onClick={() => console.log(errors.email?.message)}
                  value={data.email}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Example@redberry.ge"
                  className={`outline-none border border-grey focus:border-blue-magenta ${
                    dirtyFields.email && errors.email
                      ? " focus:border-red-300 border-red-300"
                      : dirtyFields.email
                      ? " focus:border-green-300 border-green-300"
                      : ""
                  } bg-grey-bg rounded-xl placeholder-default-input-grey text-black font-normal text-sm px-4 py-3 w-full mb-2`}
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
    </>
  );
};

export default AddBlog;

/*${
                      dirtyFields.author && errors.author
                        ? " focus:border-red-300"
                        : " focus:border-green-300"
                    }*/

/*
borderColor: `${
                              dirtyFields.category_options &&
                              errors.category_options
                                ? "#FF0000"
                                : dirtyFields.category_options
                                ? "#00FF00"
                                : "#E4E3EB"
                            }`, // Change this to the desired focused border color
                            "&:focus": {
                              borderColor: "#fff", // Change this to the desired focused border color on hover
                            },
*/
