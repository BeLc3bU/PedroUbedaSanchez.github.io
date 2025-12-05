export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="text-center py-6 bg-stone-200 dark:bg-slate-800 mt-16" id="footer">
            <p className="text-slate-600 dark:text-slate-400">
                &copy; {year} Pedro Úbeda Sánchez. Todos los derechos reservados.
            </p>
        </footer>
    );
}
