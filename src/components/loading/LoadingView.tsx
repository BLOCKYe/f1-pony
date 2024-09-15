import { useTheme } from '@/providers/theme-provider';

const LoadingView = () => {
  const { theme } = useTheme();

  return (
    <div
      key={theme}
      className='fixed bg-background w-screen h-screen z-50 top-0 left-0 grid place-items-center place-content-center fade-in'>
      <img src='/vite.svg' alt='logo' className='fade-in-2 w-14 h-full' />
    </div>
  );
};

export default LoadingView;
