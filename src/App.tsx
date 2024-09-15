import Footer from '@/components/footer/Footer';
import LoadingView from '@/components/loading/LoadingView';
import { HomeViewSections } from '@/components/nav-bar/HomeViewSections';
import Navbar from '@/components/nav-bar/Navbar';
import MainWrapper from '@/components/wrappers/MainWrapper';
import queryClient from '@/core/queryClient';
import Header from '@/modules/header/components/Header';
import Races from '@/modules/races/components/Races';
import Standings from '@/modules/standings/components/Standings';
import { GlobalProvider } from '@/providers/GlobalContext';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryClientProvider } from 'react-query';

const App = () => {
  return (
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='light'>
          <LoadingView />

          <Navbar />
          <MainWrapper>
            <div id={HomeViewSections.BASIC}>
              <Header />
            </div>

            <div id={HomeViewSections.STANDINGS}>
              <Standings />
            </div>

            <div id={HomeViewSections.RACES}>
              <Races />
            </div>

            <Footer />
          </MainWrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalProvider>
  );
};

export default App;
