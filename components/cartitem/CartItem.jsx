import styles from "./CartItem.module.scss";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "react-feather";
import { useState } from "react";
export default function CartItem(props) {
  const {
    name,
    price,
    sale,
    stock,
    image,
    id,
    discount,
    apiKey,
    quantity: quan,
  } = props;

  const [quantity, setQuantity] = useState(quan);

  const handleQuantity = (action) => {
    let cartItems = JSON.parse(localStorage.getItem("cart"));

    switch (action) {
      case "increase":
        if (quantity < stock) {
          if (cartItems === null)
            localStorage.setItem(
              "cart",
              JSON.stringify([{ id, name, quantity: quantity + 1, image }])
            );
          else {
            let filtered = cartItems.filter((item) => item.id != id);
            filtered.push({ id, name, quantity: quantity + 1, image });
            localStorage.setItem("cart", JSON.stringify(filtered));
          }
          setQuantity(quantity + 1);
        } else alert("Quanity Stock");
        break;
      case "decrease":
        if (quantity > 1) {
          if (cartItems === null)
            localStorage.setItem(
              "cart",
              JSON.stringify([{ id, name, quantity: quantity - 1, image }])
            );
          else {
            let filtered = cartItems.filter((item) => item.id != id);
            filtered.push({ id, name, quantity: quantity - 1, image });
            localStorage.setItem("cart", JSON.stringify(filtered));
          }
          setQuantity(quantity - 1);
        }
        break;
      case "remove":
        if (cartItems !== null) {
          let filtered = cartItems.filter((item) => item.id != id);
          localStorage.setItem("cart", JSON.stringify(filtered));
        }

      default:
        break;
    }
    props.updatePage();
  };

  let finalPrice = Math.round(price * ((100 - discount) / 100)); //With discount

  return (
    <div className={styles.product}>
      <div className={styles.productDetails}>
        <div style={{ backgroundImage: `url(${image})` }}></div>
        <div className={styles.productDetailsIn}>
          <Link href={`/products/${id}`}>
            <a>{name}</a>
          </Link>
          <Trash2 onClick={() => handleQuantity("remove")} />
        </div>
      </div>
      <div className={styles.productQuantity}>
        <div>
          <span onClick={() => handleQuantity("decrease")}>
            <Minus />
          </span>
          <span>{quantity}</span>
          <span onClick={() => handleQuantity("increase")}>
            <Plus />
          </span>
        </div>
      </div>
      <div className={styles.productTotal}>${finalPrice * quantity}</div>
    </div>
  );
}
