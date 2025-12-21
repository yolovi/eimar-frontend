import Hero from "@/components/features/Hero";
import About from "@/components/features/About";
import Contact from "@/components/features/Contact";

const Home = () => {
  return (
    <>
      {/* Hero Section con imagen y eslogan */}
      <Hero 
        title="Donde el sabor y la esencia se encuentran."
        subtitle="Descubre la auténtica experiencia gastronómica en el corazón de Paiporta"
        height="lg"
      />
      
      {/* About Section - Historia e identidad del restaurante */}
      <About />
      
      {/* Futuras secciones */}
      {/* <Menu /> */}
      {/* <Gallery /> */}
      
      {/* Contact Section */}
      <Contact />
    </>
  );
};

export default Home;
