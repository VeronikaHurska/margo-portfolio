import Hero from "./components/Hero";
import Projects from "./components/Projects";

export default function App() {
  return (
    <div style={{
      width: "100%",
      maxWidth: 960,
      margin: "0 auto",
      padding: "2rem 1.5rem",
      minHeight: "100vh"
    }}>
      <Hero />
      <Projects />
    </div>
  );
}
