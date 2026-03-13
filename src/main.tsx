import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// --- CLEANUP LEGACY SERVICE WORKERS ---
// This ensures that old Service Workers from the previous version of the site
// do not interfere with the new React application.
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
            registration.unregister();
        }
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
);