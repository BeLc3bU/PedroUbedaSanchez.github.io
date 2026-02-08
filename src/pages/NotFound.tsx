import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="bg-grid-pattern min-h-screen flex items-center justify-center px-6">
            <Helmet>
                <title>404 | Error en la Transmisión</title>
            </Helmet>

            <div className="card-tech max-w-xl w-full text-center p-12 backdrop-blur-3xl border-cyan-500/30">
                <div className="relative inline-block mb-10">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-[40px] rounded-full animate-pulse"></div>
                    <h1 className="text-9xl font-black text-white relative">404</h1>
                </div>

                <div className="space-y-6 mb-12">
                    <h2 className="text-3xl font-black text-white flex items-center justify-center gap-3">
                        <ShieldAlert size={32} className="text-cyan-400" />
                        ERROR DE ENLACE
                    </h2>
                    <p className="text-slate-400 font-light leading-relaxed">
                        El recurso solicitado no ha podido ser localizado en los servidores del sistema. Es posible que la transmision haya sido interceptada o el enlace haya expirado.
                    </p>
                </div>

                <Link
                    to="/"
                    className="group bg-white text-slate-950 font-black py-4 px-10 rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 shadow-[0_10px_40px_-10px_rgba(34,211,238,0.5)]"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    REINICIAR SISTEMA
                </Link>
            </div>
        </div>
    );
}
