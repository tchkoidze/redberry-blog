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
  const [lastIndex, setLastIndex] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[] | undefined>(
    []
  );
  let d: BlogType[] | undefined;
  const blogsPerPage = 4;
  const token =
    "f7762c8a3f35e7996c89db12e3d96eb9c761316b407aafb56d6515c958c8319b";
  let { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  console.log(typeof id);
  let numericId = null;

  /*const handlePrevClick = () => {
    setStartIndex(Math.max(0, startIndex - 4));
  };

  const handleNextClick = () => {
    console.log(d);
    if (d && d.length > 0) {
      console.log(333);
      setStartIndex(Math.min(d.length - 4, startIndex + 4));
    }
  };*/

  // Calculate the indexes of the blogs to be shown on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  //const currentBlogs = filteredBlogs?.slice(indexOfFirstBlog, indexOfLastBlog);
  const currentBlogs = filteredBlogs?.slice(startIndex, startIndex + 4);

  const handleNextPage = () => {
    //setCurrentPage((prevPage) => prevPage + 1);
    if (startIndex + 4 < (filteredBlogs?.length ?? 0)) {
      setStartIndex((current) => current + 1);
    }
  };

  const handlePrevPage = () => {
    //setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    if (startIndex !== 0) {
      setStartIndex((current) => current - 1);
    }
  };

  const filter = () => {
    d = blogs?.filter((blog: BlogType) => {
      if (blog.id != data?.id) {
        for (let i = 0; i < blog.categories.length; i++) {
          for (let t = 0; data?.categories && t < data.categories.length; t++) {
            if (blog.categories[i].id === data?.categories[t].id) {
              return true; // Found a match, exit and include this blog
            }
          }
        }
      }
      return false; // No match found for this blog
    });
    setFilteredBlogs(d);
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
    //filter();
  }, []);

  useEffect(() => {
    filter();
  }, [blogs]);

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
          className="flex gap-4 font-medium text-xs overflow-x-scroll max-w-[720px] flex-shrink-0 no-scrollbar mt-6 mb-10"
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
            <svg
              onClick={handlePrevPage}
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="44"
                height="44"
                rx="22"
                className={`${
                  startIndex < 1
                    ? "hover:fill-[#D9D8E0] active:fill-[#CFCED6]"
                    : "hover:fill-[#512BE7] active:fill-[#4721DD]"
                }`}
                fill={startIndex < 1 ? "#E4E3EB" : "#5D37F3"}
              />
              <path
                d="M18 23C18.5523 23 19 22.5523 19 22C19 21.4477 18.5523 21 18 21L18 23ZM17.1929 21.2929C16.8024 21.6834 16.8024 22.3166 17.1929 22.7071L23.5569 29.0711C23.9474 29.4616 24.5805 29.4616 24.9711 29.0711C25.3616 28.6805 25.3616 28.0474 24.9711 27.6569L19.3142 22L24.9711 16.3431C25.3616 15.9526 25.3616 15.3195 24.9711 14.9289C24.5805 14.5384 23.9474 14.5384 23.5569 14.9289L17.1929 21.2929ZM18 21L17.9 21L17.9 23L18 23L18 21Z"
                //fill="#1A1A1F"
                fill={startIndex < 1 ? "#1A1A1F" : "white"}
              />
            </svg>
            <svg
              onClick={handleNextPage}
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="44"
                y="44"
                width="44"
                height="44"
                rx="22"
                transform="rotate(180 44 44)"
                className={`${
                  startIndex + 4 <= (filteredBlogs?.length ?? 0)
                    ? "hover:fill-[#512BE7] active:fill-[#4721DD]"
                    : "hover:fill-[#D9D8E0] active:fill-[#CFCED6]"
                }`}
                fill={
                  startIndex + 4 <= (filteredBlogs?.length ?? 0)
                    ? "#5D37F3"
                    : "#E4E3EB"
                }
              />
              <path
                d="M26 21C25.4477 21 25 21.4477 25 22C25 22.5523 25.4477 23 26 23L26 21ZM26.8071 22.7071C27.1976 22.3166 27.1976 21.6834 26.8071 21.2929L20.4431 14.9289C20.0526 14.5384 19.4195 14.5384 19.0289 14.9289C18.6384 15.3195 18.6384 15.9526 19.0289 16.3431L24.6858 22L19.0289 27.6569C18.6384 28.0474 18.6384 28.6805 19.0289 29.0711C19.4195 29.4616 20.0526 29.4616 20.4431 29.0711L26.8071 22.7071ZM26 23L26.1 23L26.1 21L26 21L26 23Z"
                fill={
                  startIndex + 4 <= (filteredBlogs?.length ?? 0)
                    ? "white"
                    : "#1A1A1F"
                }
              />
            </svg>
            {/*<img
              src={previous}
              alt="previous arrow"
              onClick={handlePrevPage}
              
            />*/}
            {/* <img src={next} alt="next arrow" />*/}
          </div>
        </div>
        <div className="flex gap-11 ">
          {blogs ? (
            currentBlogs?.map((filteredBlog: BlogType) => (
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

/*blogs
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
              .slice(startIndex, startIndex + 4) */
