import Hero from "@/components/features/Hero";
import About from "@/components/features/About";
import Contact from "@/components/features/Contact";
import Reservations from "@/components/features/Reservations";
import { MenuIntro } from "@/components/features/Menu";

const Home = () => {
  return (
    <>
      <Hero
        title="Donde el sabor y la esencia se encuentran."
        subtitle="Descubre la auténtica experiencia gastronómica en el corazón de Paiporta"
        height="md"
      />

      <About />

      {/* Sección introductoria del menú */}
      <div id="menu-intro">
        <MenuIntro />
      </div>

      {/* Futuras secciones */}
      {/* <Gallery /> */}
      <Reservations />
      <Contact />
    </>
  );
};

export default Home;
