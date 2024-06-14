// import { Feature } from "@/components/Feature";
import Footer from "@/components/Footer";
import { Hero } from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import { Table } from "@/components/Table";
import { TextParallax } from "@/components/Text-parallex";
import Image from "next/image";

export default function Home() {
  return (
   <main className=" bg-[#0A0A0A] h-screen w-full ">
    <section>
      <Navbar/>
    </section>

    <section>
    <Hero/>
    </section>
  
    <section>
    <TextParallax/>
    </section>
    <section>
    <Table/>
    </section>
    <section>
    <Footer/>
    </section>
   </main>
  );
}
