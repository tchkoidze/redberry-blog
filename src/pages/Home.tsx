import axios, { AxiosResponse } from "axios";
import bg from "../assets/images/background-img.png";
import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | undefined>();

  const token =
    "12e12dd275cca1deb8fe8d79cc61874d2c24c90c463ea3ccb2361c9820c66e20";

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
  }, []);

  console.log(categories);

  return (
    <main className="bg-ghost-white">
      <div className="flex items-center justify-center gap-[426px] py-16">
        <h1 className="text-black font-bold text-[64px] leading-[72px]">
          ბლოგი
        </h1>
        <img src={bg} alt="background-img" />
      </div>
      <div className="flex flex-wrap justify-center">
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
    </main>
  );
};

export default Home;
