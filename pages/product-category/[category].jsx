import Navbar from "../../components/Navbar";
import GoogleFonts from "next-google-fonts";
import Product from "../../components/product/Product";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronRight } from "react-feather";

export default function Category({ products }) {
  const router = useRouter();
  const query = router.query.category;
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
          <span>
            <ChevronRight size={15} />
          </span>
          <span>
            <Link href={`/product-category/${query}`}>
              <a>{query}</a>
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

export async function getStaticProps(context) {
  const response = await (
    await fetch(
      `${process.env.SERVER_URL}/products?category=${context.params.category}`
    )
  ).json();

  return {
    props: { products: response.products },
  };
}

export async function getStaticPaths() {
  const response = await (
    await fetch(`${process.env.SERVER_URL}/products`)
  ).json();

  let categories = [];
  response.products.forEach((product) => {
    product.category.forEach((cat) => {
      if (!categories.includes(cat)) categories = [...categories, cat];
    });
  });

  let paths = [];

  categories.forEach((cat) => {
    paths.push({ params: { category: cat } });
  });
  return {
    paths,
    fallback: false,
  };
}
