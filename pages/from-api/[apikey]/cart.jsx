import Navbar from "../../../components_from-api/Navbar";
import GoogleFonts from "next-google-fonts";
import CartItem from "../../../components_from-api/cartitem/CartItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function cart() {
  let serverUrl = "http://localhost:5000";

  let { query } = useRouter();

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    callServer();
  }, []);

  let subTotal = 0;

  const callServer = async function callServer() {
    const cartLocal = localStorage.getItem(`cart${query.apikey}`);

    if (cartLocal !== null && cartLocal !== []) {
      const response = await (
        await fetch(`${serverUrl}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: JSON.parse(cartLocal) }),
        })
      ).json();

      // Match with corresponding items

      let cProducts = [],
        parsedCartLocal = JSON.parse(cartLocal);

      response.products.forEach((prod) => {
        const { id } = prod;
        const found = parsedCartLocal.find((element) => element.id === id);

        cProducts.push({ ...prod, ...found });
      });

      // Order cProducts by id
      var corted = cProducts.sort((a, b) =>
        a.id > b.id ? 1 : b.id > a.id ? -1 : 0
      );

      if (corted.length === 0) setCartItems(null);
      else setCartItems(corted);
    } else {
      setCartItems(null);
    }
  };
  const updatePage = () => {
    setCartItems([]);
    callServer();
  };

  if (cartItems === null)
    return (
      <div className="page-container cart-page">
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Josefin+Sans:wght@300;400;500;700&display=swap" />
        <Navbar />
        <div className="container cart-container">
          <div className="row">
            <div className="col cc-left">
              <h1 className="title">Cart is empty</h1>
              <Link href={`/from-api/${query.apikey}/products`}>
                <a className="gbts">Go back to shop</a>
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    );

  if (cartItems.length === 0)
    return (
      <div className="page-container cart-page">
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Josefin+Sans:wght@300;400;500;700&display=swap" />
        <Navbar />
        <div className="container cart-container">
          <div className="row">
            <div className="col cc-left">
              <h1 className="title">loading...</h1>
            </div>
          </div>
        </div>
      </div>
    );

  // Calculate Total
  cartItems.forEach((cItem) => {
    subTotal +=
      Math.round(cItem.price * ((100 - cItem.discount) / 100)) * cItem.quantity;
  });

  return (
    <div className="page-container cart-page">
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Josefin+Sans:wght@300;400;500;700&display=swap" />
      <Navbar />
      <div className="container cart-container">
        <div className="row">
          <div className="col-12 col-md-8 cc-left">
            <h1 className="title">Cart</h1>
            <div className="products">
              {cartItems.map((cItem) => (
                <CartItem key={cItem.id} {...cItem} updatePage={updatePage} />
              ))}
            </div>
          </div>
          <div className="col-12 col-md-4 cc-right">
            <div className="summary">Summary</div>
            <div className="summary-list">
              <span>Subtotal</span>
              <span>${subTotal}</span>
            </div>
            <div className="summary-list">
              <span>Total</span>
              <span>${subTotal}</span>
            </div>
            <Link href={`/from-api/${query.apikey}/checkout`}>
              <a className="ptc">Proceed to Checkout</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
