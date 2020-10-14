import Navbar from "../../components/Navbar";
import GoogleFonts from "next-google-fonts";
import Product from "../../components/product/Product";
import Link from "next/link";

export default function Products({ products }) {
  return (
    <div className="page-container products-page">
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Josefin+Sans:wght@300;400;500;700&display=swap" />
      <Navbar />
      <div className="container">
        <h1 className="title">Products</h1>
        <div className="products-breadcrumb">
          <span>
            <Link href="/products">
              <a>Products</a>
            </Link>
          </span>
        </div>
        <div className="products-container">
          {products.map((product) => (
            <Product {...product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const response = await (
    await fetch(`${process.env.SERVER_URL}/products`)
  ).json();
  return {
    props: { products: response.products },
  };
}
