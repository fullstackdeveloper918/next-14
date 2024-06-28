import Signup from "@/modules/Auth/components/Signup";
import { Head, Html } from "next/document";
import Image from "next/image";
import MainPage from '../app/home/page'
import { Header } from "./components/header/header";
export default function Home() {
  return (
    
    <>
      {/* <Header /> */}
     <div className="container" style={{padding:200}}>
      <Signup/>
      {/* <MainPage /> */}
    </div>
    </>
  );
}
