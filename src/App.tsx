import LoadingView from '@/components/loading/LoadingView';
import Navbar from '@/components/nav-bar/Navbar';
import queryClient from '@/core/queryClient';
import { GlobalProvider } from '@/providers/GlobalContext';
import router from '@/providers/router';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='light'>
          <LoadingView />

          <Navbar />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalProvider>
  );
};

export default App;
