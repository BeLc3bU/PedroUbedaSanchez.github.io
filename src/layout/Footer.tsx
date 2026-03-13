export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="text-center py-8 px-4 border-t border-border bg-background">
            <p className="text-muted-foreground text-sm">
                © {year} Pedro Úbeda Sánchez. All rights reserved.
            </p>
        </footer>
    );
}