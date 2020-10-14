import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";
export default function Button() {
  const { query } = useRouter();
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <Link href={`/from-api/${query.apikey}/products`}>
            <a>Products</a>
          </Link>
        </li>
        <li>
          <Link href={`/from-api/${query.apikey}/about`}>
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href={`/from-api/${query.apikey}/contact`}>
            <a>Contact</a>
          </Link>
        </li>
        <li>
          <Link href={`/from-api/${query.apikey}/cart`}>
            <a>Cart</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
