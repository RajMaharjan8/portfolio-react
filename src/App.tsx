import Navbar from "./components/organisms/Navbar";
import Hero from "./components/organisms/Hero";
import About from "./components/organisms/About";
import MyStack from "./components/organisms/MyStack";
import Projects from "./components/organisms/Projects";
import Experience from "./components/organisms/Experience";
import Contact from "./components/organisms/Contact";
import Footer from "./components/organisms/Footer";
import BackToTop from "./components/atoms/BackToTop";

function App() {
  return (
    <>
      <Navbar />
      <Hero name="Raj" />
      <About />
      <MyStack />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
