import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../components/BackToTop';

export default function Layout() {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen bg-background dark:bg-slate-900 text-foreground dark:text-slate-200 transition-colors duration-300">
            <Header />
            <main id="main-content" className="flex-grow flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex-grow flex flex-col"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
            <BackToTop />
            <Footer />
        </div>
    );
}
