import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#analyze">
        Skip to image analysis
      </a>
      <Navbar />
      <main id="main">
        <Home />
      </main>
      <Footer />
    </>
  );
}
