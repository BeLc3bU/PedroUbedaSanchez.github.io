import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../components/BackToTop';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-stone-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
            <Header />
            <main id="main-content" className="flex-grow">
                <Outlet />
            </main>
            <BackToTop />
            <Footer />
        </div>
    );
}
