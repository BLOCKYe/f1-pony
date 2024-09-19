import Footer from '@/components/footer/Footer';
import { HomeViewSections } from '@/components/nav-bar/HomeViewSections';
import MainWrapper from '@/components/wrappers/MainWrapper';
import Header from '@/modules/home/components/Header';
import Races from '@/modules/races/components/Races';
import Standings from '@/modules/standings/components/Standings';

const HomePage = () => {
  return (
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
  );
};

export default HomePage;
