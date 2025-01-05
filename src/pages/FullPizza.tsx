import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../scss/components/_full-pizza.scss";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    prices: number[];

    sizes: number[];
  }>();

  const typeNames = ["тонкое", "традиционное"];
  const { id } = useParams();
  const dimaPidr = Number(id);

  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://66eb02d655ad32cda47b55c9.mockapi.io/items`
        );
        const dimaGey = data.find((item: any) => item.id === dimaPidr);

        setPizza(dimaGey);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container full-pizza__all">
      <img style={{ width: "300px", height: "auto" }} src={pizza.imageUrl} />
      <h2 className="full-pizza__title">{pizza.title}</h2>
      <div>
        {pizza.prices.map((price, index) => (
          <li className="full-pizza__item" key={index}>
            {price} ₽
          </li>
        ))}
      </div>

      <div>
        {typeNames.map((type, index) => (
          <li className="full-pizza__item" key={index}>
            {type}
          </li>
        ))}
      </div>

      <div>
        {pizza.sizes.map((size, index) => (
          <li className="full-pizza__item" key={index}>
            {size} см
          </li>
        ))}
      </div>
      <Link to="/">
        <button className="button button--outline button--add full-pizza__btn">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
