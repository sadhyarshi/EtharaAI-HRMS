/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                base: '#f8fafc',
                accent: '#e0e7ff',
                card: 'rgba(255, 255, 255, 0.85)',
                ink: '#0f172a',
                muted: '#64748b',
                primary: {
                    DEFAULT: '#3b82f6',
                    strong: '#2563eb',
                },
                danger: '#ef4444',
                success: '#10b981',
                warning: '#f59e0b',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['Space Grotesk', 'Inter', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 20px 40px -10px rgba(0,0,0,0.05)',
                'float': '0 10px 40px -10px rgba(59,130,246,0.15)',
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)',
                'surface-gradient': 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
            }
        },
    },
    plugins: [],
}
