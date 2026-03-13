import { useCallback } from 'react';

export function usePrint() {
    const handlePrint = useCallback((e: React.MouseEvent, url: string) => {
        e.preventDefault();
        let iframe = document.getElementById('print-iframe-cv') as HTMLIFrameElement | null;

        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'print-iframe-cv';
            iframe.src = url;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            iframe.onload = () => {
                iframe?.contentWindow?.focus();
                iframe?.contentWindow?.print();
            };
        } else {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
        }
    }, []);

    return { handlePrint };
}
