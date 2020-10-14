import Navbar from "../../../components_from-api/Navbar";
import GoogleFonts from "next-google-fonts";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components_from-api/CheckoutForm";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function checkout() {
  let serverUrl = "http://localhost:5000";
  var submitButton = useRef(null);
  var formState = useRef(null);
  var [formData, setFormData] = useState({});
  var [canPay, setCanPay] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  let { query } = useRouter();

  const promise = loadStripe(
    "pk_test_51HSbLfJWtFaPHHqA6HPo49ftXokpZIZcEdEX91YFaqp21XFCLWQMNDxSzLOZ5dwZuLH5PFP7UVQ6qax7cvuNGkd9005liu13E2"
  );

  const initiatePayment = () => {
    submitButton.current.click();
    setTimeout(() => {
      let state = formState.current.innerText;
      if (state === "true" || state === true) {
        setCanPay(true);
      } else setCanPay(false);
    }, 1000);
  };

  // Check for empty cart
  useEffect(() => {
    async function callServer() {
      const cartLocal = localStorage.getItem(`cart${query.apikey}`);

      if (cartLocal !== null || cartLocal !== []) {
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
    }
    callServer();
  }, []);

  if (cartItems === null) {
    return (
      <div className="page-container checkout-page">
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Josefin+Sans:wght@300;400;500;700&display=swap" />
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 cc-left">
              <h1 className="title">Cart is empty</h1>
              <Link href="/products">
                <a className="gbts">Go back to shop</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  let subTotal = 0;

  cartItems.forEach((item) => {
    subTotal += Math.round(
      Number(item.quantity) *
        (Number(item.price) * ((100 - Number(item.discount)) / 100))
    );
  });

  return (
    <div className="page-container checkout-page">
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Josefin+Sans:wght@300;400;500;700&display=swap" />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 cc-left">
            <h1 className="title">Checkout</h1>
            <div className="form-container">
              <Formik
                initialValues={{
                  email: "",
                  name: "",
                  addressOne: "",
                  addressTwo: "",
                  country: "",
                  city: "",
                  state: "",
                  postcode: "",
                }}
                validate={(values) => {
                  const errors = {};

                  // Email
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }

                  if (!values.name) errors.name = "Required";
                  if (!values.addressOne) errors.addressOne = "Required";
                  if (!values.country) errors.country = "Required";
                  if (!values.city) errors.city = "Required";
                  if (!values.state) errors.state = "Required";
                  if (!values.postcode) errors.postcode = "Required";

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setFormData(values);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, isValid }) => (
                  <Form>
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col">
                          <div className="c-form-field">
                            <label htmlFor="email">You E-Mail</label>
                            <Field type="email" name="email" />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="em"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <div className="c-form-field">
                            <label htmlFor="name">Full Name</label>
                            <Field type="text" name="name" />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="em"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <div className="c-form-field">
                            <label htmlFor="addressOne">Address Line 1</label>
                            <Field type="text" name="addressOne" />
                            <ErrorMessage
                              name="addressOne"
                              component="div"
                              className="em"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <div className="c-form-field">
                            <label htmlFor="addressTwo">Address Line 2</label>
                            <Field type="text" name="addressTwo" />
                            <ErrorMessage
                              name="addressTwo"
                              component="div"
                              className="em"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="c-form-field">
                            <label htmlFor="city">City</label>
                            <Field type="text" name="city" />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="em"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="c-form-field">
                            <label htmlFor="state">State</label>
                            <Field type="text" name="state" />
                            <ErrorMessage
                              name="state"
                              component="div"
                              className="em"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="c-form-field">
                            <label htmlFor="country">Country</label>
                            <Field type="text" name="country" />
                            <ErrorMessage
                              name="country"
                              component="div"
                              className="em"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <div className="c-form-field">
                            <label htmlFor="postcode">Postcode</label>
                            <Field type="text" name="postcode" />
                            <ErrorMessage
                              name="postcode"
                              component="div"
                              className="em"
                            />
                          </div>
                        </div>
                      </div>
                      <span style={{ display: "none" }} ref={formState}>
                        {JSON.stringify(isValid)}
                      </span>
                      <button
                        hidden={true}
                        type="submit"
                        disabled={isSubmitting}
                        ref={submitButton}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-12 col-md-4 cc-right">
            <div className="order-summary">
              <div className="subtitle">Order Summary</div>
              {cartItems.map((item) => (
                <div className="os-product">
                  <div
                    className="os-product-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="os-product-name">
                    <Link
                      href={`/from-api/${query.apikey}/products/${item.id}`}
                    >
                      <a>{item.name}</a>
                    </Link>
                  </div>
                  <div className="os-product-total">
                    $
                    {Math.round(
                      Number(item.quantity) *
                        (Number(item.price) *
                          ((100 - Number(item.discount)) / 100))
                    )}
                  </div>
                </div>
              ))}
              <div className="total">
                <span>Total</span>
                <span>${subTotal}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={initiatePayment}
              className={canPay ? "pay-now active" : "pay-now"}
            >
              {canPay ? "Enter Payment details" : "Proceed to Payment"}
            </button>
            <div className="stripe-container">
              {canPay ? (
                <Elements stripe={promise}>
                  <CheckoutForm />
                </Elements>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
