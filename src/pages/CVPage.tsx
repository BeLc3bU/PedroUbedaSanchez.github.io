import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { pdf } from '@react-pdf/renderer';
import CVDocument from '@/components/CVDocument';
import { portfolioData } from '@/data/portfolio';
import { Download, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CVPage() {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const generatePdf = async () => {
      try {
        const blob = await pdf(<CVDocument />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    };
    generatePdf();
  }, []);

  const handleDownload = async () => {
    if (!pdfUrl) {
      setLoading(true);
      try {
        const blob = await pdf(<CVDocument />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${portfolioData.name.replace(/\s+/g, '_')}_Resume.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        setLoading(false);
      }
      return;
    }
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${portfolioData.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      <Helmet>
        <title>Resume | {portfolioData.name}</title>
        <meta name="description" content={`Resume/CV of ${portfolioData.name}`} />
      </Helmet>

      {/* Header flotante */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-sm"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Botón de descarga flotante */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleDownload}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium disabled:opacity-50 shadow-sm"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          {loading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      {/* PDF Viewer */}
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          className="w-full h-full border-none"
          title="Resume PDF"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-4">
            <Loader2 size={48} className="animate-spin text-cyan-600" />
            <p className="text-zinc-600 dark:text-zinc-400">Loading resume...</p>
          </div>
        </div>
      )}
    </div>
  );
}