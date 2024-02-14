import axios from "axios";
import bg from "../assets/images/background-img.png";
import React, { useEffect, useState } from "react";
import { Blog } from "../types";
import { Link } from "react-router-dom";
import LinkArrow from "../svg/LinkArrow";
import LinesEllipsis from "react-lines-ellipsis";

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
      <section className="flex flex-wrap gap-x-8 gap-y-14 mt-16 pb-[66px]">
        {blogs &&
          blogs
            .filter((blog) => {
              const publishDate = new Date(blog.publish_date);
              const today = new Date();
              return publishDate <= today; // Filter out blogs with publish date older than today
            })
            .map((blog) => (
              // Repeat the rendering code for each blog four times

              <div key={`${blog.id}`} className="">
                <img
                  src={blog.image}
                  alt="img"
                  className="object-cover w-[408px] h-[328px] rounded-xl"
                />
                <div className="flex flex-col gap-4 mt-6">
                  <div>
                    <h4
                      key={`${blog.id}`}
                      className="text-black font-medium text-base leading-5"
                    >
                      {blog.author}
                    </h4>
                    <p className="text-default-input-grey font-normal text-xs mt-2">
                      {blog.publish_date}
                    </p>
                  </div>

                  <h2 className="text-black font-medium text-xl max-w-[408px]">
                    {blog.title}
                  </h2>

                  <ul
                    className="flex gap-4 font-medium text-xs overflow-x-scroll max-w-[408px] flex-shrink-0 no-scrollbar"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {blog.categories.map((category) => (
                      <li
                        key={category.id}
                        className="rounded-[30px] px-2.5 py-1.5"
                        style={{
                          backgroundColor: category.background_color,
                          color: category.text_color,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {category.title}
                      </li>
                    ))}
                  </ul>
                  <div className="max-w-[408px]">
                    <LinesEllipsis
                      text={blog.description}
                      maxLine="2"
                      ellipsis="..."
                    ></LinesEllipsis>
                  </div>

                  <Link
                    to={`/blogs/${blog.id}`}
                    className="flex items-center text-blue-magenta font-medium text-sm"
                  >
                    <span>სრულად ნახვა</span>
                    <LinkArrow />
                  </Link>
                </div>
              </div>
            ))}
      </section>
    </main>
  );
};

export default Home;
