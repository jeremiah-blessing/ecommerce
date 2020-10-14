import Navbar from "../components/Navbar";
import GoogleFonts from "next-google-fonts";
export default function contact() {
  return (
    <div className="page-container">
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Josefin+Sans:wght@300;400;500;700&display=swap" />
      <Navbar />
      Contact
    </div>
  );
}
