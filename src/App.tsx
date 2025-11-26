import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from "./pages/Landing";
import Portfolio from "./pages/Portfolio";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Keystatic from "./pages/Keystatic";
import FloatingNav from "./components/FloatingNav";
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const location = useLocation();
  const isKeystatic = location.pathname.startsWith('/keystatic');

  return (
    <>
      <ScrollToTop />
      {!isKeystatic && <FloatingNav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/keystatic/*" element={<Keystatic />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;