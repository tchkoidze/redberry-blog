import axios, { AxiosResponse } from "axios";
import bg from "../assets/images/background-img.png";
import React, { useEffect, useState } from "react";
import { Blog } from "../types";

interface Category {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | undefined>();

  const [blogs, setBlogs] = useState<Blog[] | null>();

  const token =
    "f7762c8a3f35e7996c89db12e3d96eb9c761316b407aafb56d6515c958c8319b";

  /*const getCategories = () => {
    axios
      .get("https://api.blog.redberryinternship.ge/api/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  };*/

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.blog.redberryinternship.ge/api/categories",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getAllBlogs();
  }, []);

  const getAllBlogs = async () => {
    try {
      const response = await axios.get(
        "https://api.blog.redberryinternship.ge/api/blogs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.data);
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <main
      className="bg-ghost-white h-[calc(100%-80px)] px-[76px]"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className="flex items-center justify- justify-between  py-16">
        <h1 className="text-black font-bold text-[64px] leading-[72px]">
          ბლოგი
        </h1>
        <img src={bg} alt="background-img" />
      </div>
      <div className="flex flex-wrap justify-center gap-[24px]">
        {categories?.map((category) => (
          <button
            key={category.id}
            style={{
              color: category.text_color,
              backgroundColor: category.background_color,
            }}
            className={` px-4 py-2 rounded-[30px]`}
          >
            {category.title}
          </button>
        ))}
      </div>
      <section>
        {blogs &&
          blogs.map((blog) => (
            <div key={blog.id}>
              <img src={blog.image} alt="" />
              <h4 key={blog.id}>{blog.author}</h4>
              <p>{blog.publish_date}</p>
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
            </div>
          ))}
      </section>
    </main>
  );
};

export default Home;

//blogs?.length && <div>{blogs.map((item)=>{<p>{item[id]}</p>})}</div>
