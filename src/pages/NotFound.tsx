import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>Página no encontrada | Error 404</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-6xl font-bold text-orange-700 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Página no encontrada</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
                <Link
                    to="/"
                    className="bg-orange-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-800 transition-colors duration-300 shadow-lg"
                >
                    Volver al Inicio
                </Link>
            </div>
        </>
    );
}
