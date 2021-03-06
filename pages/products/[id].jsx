import Navbar from "../../components/Navbar";
import GoogleFonts from "next-google-fonts";
import { Plus, Minus, ShoppingCart } from "react-feather";
import { useState } from "react";
import Link from "next/link";

export default function product({ product }) {
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
  } = product;

  let finalPrice = Math.round(price * ((100 - discount) / 100));

  const [quantity, setQuantity] = useState(1);

  const handleCart = (action) => {
    let cartItems = JSON.parse(localStorage.getItem("cart"));

    switch (action) {
      case "add":
        if (cartItems === null)
          localStorage.setItem(
            "cart",
            JSON.stringify([{ id, quantity, quantity, image }])
          );
        else {
          let filtered = cartItems.filter((item) => item.id != id);
          filtered.push({ id, name, quantity, image });
          localStorage.setItem("cart", JSON.stringify(filtered));
        }
        break;
      case "remove":
        if (cartItems !== null) {
          let filtered = cartItems.filter((item) => item.id != id);
          localStorage.setItem("cart", JSON.stringify(filtered));
        }
        break;

      default:
        break;
    }
  };

  const handleQuantity = (action) => {
    switch (action) {
      case "increase":
        if (quantity < stock) setQuantity(quantity + 1);
        else alert("Quanity Stock");
        break;
      case "decrease":
        if (quantity > 1) setQuantity(quantity - 1);
        break;

      default:
        break;
    }
  };
  // TODO: Category Link

  return (
    <div className="page-container product-page">
      <Navbar />
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Josefin+Sans:wght@300;400;500;700&display=swap" />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 product-page-left">
            <div
              className="image-container"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
          <div className="col-12 col-md-6 product-page-right">
            <div className="product-categories">
              {category.map((cat) => (
                <Link href={`/product-category/${cat}`} key={cat}>
                  <div className="product-category">{cat}</div>
                </Link>
              ))}
            </div>
            <div className="product-name">{name}</div>
            <div className="product-price-container">
              <div className="product-price">
                ${finalPrice} {discount > 0 ? <span>${price}</span> : ""}
              </div>
              <div className="product-price-discount">
                {discount > 0 ? (
                  <div className="product-price-discount-number">
                    {discount}% Discount
                  </div>
                ) : (
                  ""
                )}
                <div className="product-price-tax">Inclusive of all Taxes</div>
              </div>
            </div>
            <div className="product-description-title">Description</div>
            <div className="product-description">{description}.</div>
            <div className="product-quantity">
              <span onClick={() => handleQuantity("decrease")}>
                <Minus color="white" size={16} />
              </span>
              <span className="quantity">{quantity}</span>
              <span onClick={() => handleQuantity("increase")}>
                <Plus color="white" size={16} />
              </span>
            </div>
            <div
              className="product-addtocart"
              onClick={() => handleCart("add")}
            >
              Add to Cart <ShoppingCart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const response = await (
    await fetch(`${process.env.SERVER_URL}/products/${context.params.id}`)
  ).json();
  return {
    props: { product: response.product },
  };
}

export async function getStaticPaths() {
  const response = await (
    await fetch(`${process.env.SERVER_URL}/products`)
  ).json();
  let paths = [];

  response.products.forEach((product) => {
    paths.push({ params: { id: product.id.toString() } });
  });
  return {
    paths,
    fallback: false,
  };
}
