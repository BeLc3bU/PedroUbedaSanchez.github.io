import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../components/BackToTop';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-grow">
                <Outlet />
            </main>
            <BackToTop />
            <Footer />
        </div>
    );
}
