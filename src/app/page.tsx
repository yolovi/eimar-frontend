import Hero from "@/components/features/Hero";
import About from "@/components/features/About";
import Contact from "@/components/features/Contact";
import Reservations from "@/components/features/Reservations";

const Home = () => {
  return (
    <>
      <Hero
        title="Donde el sabor y la esencia se encuentran."
        subtitle="Descubre la auténtica experiencia gastronómica en el corazón de Paiporta"
        height="md"
      />

      <About />

      {/* Futuras secciones */}
      {/* <Menu /> */}
      {/* <Gallery /> */}
      <Reservations />
      <Contact />
    </>
  );
};

export default Home;
