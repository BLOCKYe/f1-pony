import { HomeViewSections } from '@/components/nav-bar/HomeViewSections';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/theme-provider';
import scrollToElement from '@/utils/scrollToElement';
import { useMemo } from 'react';
import { BsSun, BsMoonStars } from 'react-icons/bs';

const sections = [
  {
    id: HomeViewSections.BASIC,
    title: 'Basic summaries',
  },
  {
    id: HomeViewSections.STANDINGS,
    title: 'Current standings',
  },
  {
    id: HomeViewSections.RACES,
    title: 'Races results',
  },
];

const Navbar = () => {
  const { setTheme, theme } = useTheme();

  /**
   * Render sections
   */
  const renderSections = useMemo(() => {
    return sections.map((item) => (
      <a key={item.id} onClick={() => scrollToElement(item.id)}>
        {item.title}
      </a>
    ));
  }, []);

  return (
    <div className={'fixed top-0 left-0 bg-background/70 backdrop-blur-sm w-full z-40'}>
      <div className={'px-3 md:px-5 py-3 md:py-5 max-w-5xl mx-auto'}>
        <div className={'justify-between overflow-auto flex gap-10 items-center pb-1'}>
          <img src={'/vite.svg'} alt={'logo'} className={'max-w-10 h-full'} />

          <div className={'whitespace-nowrap flex gap-10 items-center'}>
            {renderSections}

            <Button variant={'outline'} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? <BsSun /> : <BsMoonStars />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
