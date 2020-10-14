import Navbar from "../../../../components_from-api/Navbar";
import GoogleFonts from "next-google-fonts";
import Product from "../../../../components_from-api/product/Product";
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
    await fetch(
      `${process.env.SERVER_URL}/from-api/products?apikey=${params.apikey}`
    )
  ).json();
  console.log(response);
  return {
    props: { products: response.products },
  };
}

export async function getStaticPaths() {
  const response = await (
    await fetch(`${process.env.SERVER_URL}/from-api/apikeys`)
  ).json();

  let paths = [];

  response.apikeys.forEach((apikey) => {
    paths.push({ params: { apikey: apikey.key } });
  });

  return {
    paths,
    fallback: false,
  };
}
