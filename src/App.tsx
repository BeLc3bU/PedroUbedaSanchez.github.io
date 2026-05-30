import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import CVPage from "./pages/CVPage";

// Wrapper component to use useLocation
function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="cv" element={<CVPage />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
            <Toaster position="bottom-right" theme="dark" richColors />
        </BrowserRouter>
    );
}

export default App;
