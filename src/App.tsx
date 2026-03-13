import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './layout/Layout';
import Home from './pages/Home';
import CVPage from './pages/CVPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cv" element={<CVPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
      <Toaster position="bottom-right" theme="dark" richColors />
    </BrowserRouter>
  );
}

export default App;
