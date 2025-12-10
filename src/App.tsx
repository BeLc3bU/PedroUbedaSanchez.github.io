import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Education from './pages/Education';
import OtherData from './pages/OtherData';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="experiencia" element={<Experience />} />
          <Route path="habilidades" element={<Skills />} />
          <Route path="formacion" element={<Education />} />
          <Route path="otros-datos" element={<OtherData />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
