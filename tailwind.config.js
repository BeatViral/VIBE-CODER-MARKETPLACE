/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/index.html', './app/src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05050A',
        night: '#0A0A0F',
        graphite: '#11111A',
        indigoDeep: '#171339',
        violetRoyal: '#7C3AED',
        violetPlasma: '#A855F7',
        ultraviolet: '#C084FC',
        cyanNeon: '#00E5FF',
        ice: '#38BDF8',
        coral: '#FF4D6D',
        amberSignal: '#FFB020',
        acid: '#A3FF12',
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(124, 58, 237, 0.28)',
        cyan: '0 0 32px rgba(0, 229, 255, 0.18)',
        coral: '0 0 28px rgba(255, 77, 109, 0.22)',
      },
      backgroundImage: {
        'brand-radial':
          'radial-gradient(circle at 25% 12%, rgba(124,58,237,.24), transparent 34%), radial-gradient(circle at 76% 18%, rgba(0,229,255,.16), transparent 28%), linear-gradient(135deg, #05050A 0%, #0A0A0F 46%, #171339 100%)',
      },
    },
  },
  plugins: [],
};
