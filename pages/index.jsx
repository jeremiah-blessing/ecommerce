import Head from "next/head";
import Link from "next/link";
import GoogleFonts from "next-google-fonts";
import Navbar from "../components/Navbar";
import { ArrowRightCircle } from "react-feather";
function HomePage() {
  return (
    <div>
      <Head>
        <title>eCommerce</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Josefin+Sans:wght@300;400;500;700&display=swap" />

      <div className="page-container">
        <Navbar />
        <div className="container hero-container">
          <div className="row">
            <div className="col-12 col-md-6 hero-left">
              <h1 className="title">Klamen Inc.</h1>
              <p>
                we create custom hand made<br></br> products for you
              </p>
              <Link href="/products">
                <a className="shop-now">
                  Shop now <ArrowRightCircle />
                </a>
              </Link>
            </div>
            <div className="col-12 col-md-6 hero-right">
              <div className="hand-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
