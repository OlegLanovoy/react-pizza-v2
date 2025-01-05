import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../redux/cart/slice";
import { CartItem as CartItemType } from "../redux/cart/types";
import AlertConfirm from "./AlertConfirm";

//IMPORT OF ASSETS
import { PlusBtn } from "../assets/img/iconsSVG/PlusBtn";
import { MinusBtn } from "../assets/img/iconsSVG/MinusBtn";
import { CrossBtn } from "../assets/img/iconsSVG/CrossBtn";

export type CartItemProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

export const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  type,
  size,
  price,
  count,
  imageUrl,
}) => {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(addItem({ id, size, type } as CartItemType));
  };
  const onClickMinus = () => {
    dispatch(minusItem({ id, size, type }));
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    dispatch(removeItem({ id, size, type }));
    setIsModalOpen(false);
  };

  const onClickClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <MinusBtn />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <PlusBtn />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={onClickOpen}
          className="button button--outline button--circle"
        >
          <CrossBtn />
        </div>
      </div>
      {isModalOpen && (
        <AlertConfirm
          message="Delete pizza?"
          onConfirm={handleConfirm}
          onCancel={onClickClose}
        />
      )}
    </div>
  );
};
