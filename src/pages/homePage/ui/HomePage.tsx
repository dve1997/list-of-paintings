import Header from 'src/features/header';
import SearchPaintings from 'src/features/searchPaintings';
import ListOfPaintings from 'src/widgets/listOfPaintings';

import homePage from './HomePage.module.scss';

function HomePage() {
  return (
    <main className={homePage.body}>
      <Header />
      <SearchPaintings />
      <ListOfPaintings />
    </main>
  );
}

export default HomePage;
