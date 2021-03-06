import Link from "next/link";
import styles from "./Product.module.scss";
import { ShoppingCart } from "react-feather";

export default function Product(props) {
  const {
    name,
    price,
    sale,
    stock,
    image,
    id,
    discount,
    description,
    category,
    apiKey,
  } = props;

  let finalPrice = Math.round(price * ((100 - discount) / 100));

  let serverUrl = "http://localhost:5000";

  const addToCart = async () => {
    fetch(`${serverUrl}/cart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, quantity: stock }),
    });
  };
  return (
    <div className={styles.product}>
      <Link href={`/products/${id}`}>
        <div
          className={styles.productImage}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </Link>
      <div className={styles.productCategories}>
        {category.map((cat) => (
          <Link href={`/product-category/${cat}`} key={cat}>
            <a className={styles.productCategory}>{cat}</a>
          </Link>
        ))}
      </div>
      <Link href={`/products/${id}`}>
        <div className={styles.productName}>{name}</div>
      </Link>
      <div className={styles.productPrice}>
        ${finalPrice}
        {discount > 0 ? (
          <div className={styles.productDiscount}>
            ${price} - {discount}% Discount
          </div>
        ) : (
          ""
        )}
      </div>
      <div onClick={addToCart} className={styles.addToCart}>
        Add to Cart <ShoppingCart size={18} />
      </div>
    </div>
  );
}
