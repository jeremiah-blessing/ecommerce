import Link from "next/link";
import styles from "./Navbar.module.scss";
export default function Button() {
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <Link href="/products">
            <a>Products</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
        <li>
          <Link href="/cart">
            <a>Cart</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
