
/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/components/Navbar";
import "../styles/globals.css";
import RegisterForm from "@/components/RegisterForm";
import Footer from "@/components/Footer";

export default function Register() {
  return (
    <div>
      <Navbar/>
      <RegisterForm/>
      <Footer/>
    </div>
  );
}