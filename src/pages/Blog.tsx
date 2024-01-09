import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import backArrow from "../assets/images/Arrow-left.svg";
import { Blog as BlogType } from "../types";
import LinkArrow from "../svg/LinkArrow";

import LinesEllipsis from "react-lines-ellipsis";
import previous from "../assets/images/Arrow-left.svg";
import next from "../assets/images/Arrow-right.svg";

interface BackgroundObject {
  background_color: string;
  id: number;
  text_color: string;
  title: string;
}

interface BlogPost {
  author: string;
  categories: BackgroundObject[];
  description: string;
  email: string;
  id: number;
  image: string;
  publish_date: string;
  title: string;
}

const Blog = () => {
  const [data, setData] = useState<BlogPost | null>();
  const [blogs, setBlogs] = useState<BlogType[] | null>();
  const [startIndex, setStartIndex] = useState(0);

  const token =
    "f7762c8a3f35e7996c89db12e3d96eb9c761316b407aafb56d6515c958c8319b";
  let { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  console.log(typeof id);
  let numericId = null;

  const filter = () => {
    const d = blogs?.filter((blog) =>
      blog.categories.some((element) => data?.categories.includes(element))
    );
    console.log(d);
  };

  useEffect(() => {
    if (id) {
      numericId = parseInt(id, 10);
      axios
        .get(`https://api.blog.redberryinternship.ge/api/blogs/${numericId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          if (response.status >= 200) {
            setData(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [id]);

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
  useEffect(() => {
    getAllBlogs();
    filter();
  }, []);

  return (
    <div>
      <img
        src={backArrow}
        alt="back arrow"
        className="absolute left-[76px]"
        onClick={() => {
          navigate("/");
          localStorage.removeItem("data");
        }}
      />
      <div className="w-[720px] mx-auto">
        <img
          src={data?.image}
          alt=""
          className="w-[720px] h-[328px] rounded-xl"
        />
        <div className="mt-10 mb-6">
          <p className="text-black font-medium text-base leading-5">
            {data?.author}
          </p>
          <span className="text-default-input-grey font-normal text-xs mr-2">
            {data?.publish_date}
          </span>
          <span className="text-default-input-grey font-normal text-xs">
            {data?.email}
          </span>
        </div>
        <h2 className="text-black font-bold leading-10 text-[32px] leading-10">
          {data?.title}
        </h2>
        <ul
          className="flex gap-4 font-medium text-xs overflow-x-scroll max-w-[408px] flex-shrink-0 no-scrollbar mt-6 mb-10"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data?.categories.map((category) => (
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
        <p className="text-[#404049] font-normal text-base leading-7">
          {data?.description}
        </p>
      </div>
      <section className="p-[76px]">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-black font-bold text-[43px] leading-10">
            მსგავსი სტატიები
          </h2>
          <div className="flex gap-6">
            <img src={previous} alt="previous arrow" />
            <img src={next} alt="next arrow" />
          </div>
        </div>
        <div className="flex gap-8 ">
          {blogs ? (
            blogs
              ?.filter((blog: BlogType) => {
                if (blog.id != data?.id) {
                  for (let i = 0; i < blog.categories.length; i++) {
                    for (
                      let t = 0;
                      data?.categories && t < data.categories.length;
                      t++
                    ) {
                      if (blog.categories[i].id === data?.categories[t].id) {
                        return true; // Found a match, exit and include this blog
                      }
                    }
                  }
                }
                return false; // No match found for this blog
              })
              .map((filteredBlog: BlogType) => (
                <div key={filteredBlog.id}>
                  <img
                    src={filteredBlog.image}
                    alt="img"
                    className="object-cover w-[408px] h-[328px] rounded-xl"
                  />
                  <div className="flex flex-col gap-4 mt-6">
                    {" "}
                    <div>
                      <h4
                        key={`${filteredBlog.id}`}
                        className="text-black font-medium text-base leading-5"
                      >
                        {filteredBlog.author}
                      </h4>
                      <p className="text-default-input-grey font-normal text-xs mt-2">
                        {filteredBlog.publish_date}
                      </p>
                    </div>
                    <h2 className="text-black font-medium text-xl max-w-[408px]">
                      {filteredBlog.title}
                    </h2>
                    <ul
                      className="flex gap-4 font-medium text-xs overflow-x-scroll max-w-[408px] flex-shrink-0 no-scrollbar"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {filteredBlog.categories.map((category) => (
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
                        text={filteredBlog.description}
                        maxLine="2"
                        ellipsis="..."
                      ></LinesEllipsis>

                      <Link
                        to={`/blogs/${filteredBlog.id}`}
                        className="flex items-center text-blue-magenta font-medium text-sm"
                      >
                        <span>სრულად ნახვა</span>
                        <LinkArrow />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p>olla</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;

//blogs?.categories.filter((i)=>{i==category.id})

/*console.log(
                blog.categories.some((element) => {
                  console.log(element);
                  for (
                    let i = 0;
                    data?.categories && i < data?.categories.length;
                    i++
                  ) {
                    //data?.categories[i].id == element.id;
                    if (data.categories[i].id === element.id) {
                      // Perform the desired action when a match is found
                      console.log("Match found!");
                      return data.categories[i].id === element.id;
                    }
                  }
                  //data?.categories.includes(element);
                })
              ); */

/*{blogs ? (
          blogs
            ?.filter((blog: BlogType) => {
              blog.categories.some((element) =>
                data?.categories.includes(element)
              );
              for (let i = 0; i < blog.categories.length; i++) {
                console.log(blog.categories[i]);
                for (
                  let t = 0;
                  data?.categories && t < data?.categories.length;
                  t++
                ) {
                  console.log(blog.categories[i].id == data.categories[t].id);
                }
              }
            })
            .map((filteredBlog: BlogType) => (
              <div key={filteredBlog.id}>
                <p className="text-red-500">{filteredBlog.title}</p>
              </div>
            ))
        ) : (
          <p>olla</p>
        )}*/

/*
         for (let i = 0; i < blog.categories.length; i++) {
                console.log(blog.categories[i]);
                for (
                  let t = 0;
                  data?.categories && t < data?.categories.length;
                  t++
                ) {
                  console.log(blog.categories[i].id == data.categories[t].id);

                  return blog.categories[i].id == data.categories[t].id;
                }
              }
        */

/*
 return data?.categories.some((selectedCategory) =>
                blog.categories.some(
                  (blogCategory) => selectedCategory.id === blogCategory.id
                )
              );*/
