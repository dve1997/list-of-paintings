import { useAppDispatch, useAppSelector } from '../../hooks';

import Carousel from '../Carousel/Carousel';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Spinner from '../Spinner/Spinner';
import { updateAnimationCard } from '../../api/funcAppSlice';
import {
  useGetPaintingWhithSeachAndFiltersQuery,
  useGetAuthorsWhithSeachAndFiltersQuery,
  useGetLocationsWhithSeachAndFiltersQuery,
} from '../../api/apiSlice';

import listOfSlides from './listOfPeinting.module.scss';

// Функциональный компонет списка картин
function ListOfPeinting() {
  // Получение переменных из store и dispatch из хука useDispatch
  const index = useAppSelector(state => state.funcAppSlice.index);
  const animationCard = useAppSelector(
    state => state.funcAppSlice.animationCard,
  );
  const filterAuthor = useAppSelector(state => state.funcAppSlice.filterAuthor);
  const filterLoc = useAppSelector(state => state.funcAppSlice.filterLoc);
  const filterYearFrom = useAppSelector(
    state => state.funcAppSlice.filterYearFrom,
  );
  const filterYearTo = useAppSelector(state => state.funcAppSlice.filterYearTo);
  const searchValue = useAppSelector(state => state.funcAppSlice.searchValue);
  const dispatch = useAppDispatch();

  // Динамическое формирование классов animationCardClassesInf и animationCardClassesInfo
  const animationCardClassesInf =
    animationCard === false
      ? `${listOfSlides.inf} ${listOfSlides.activeinf}`
      : `${listOfSlides.inf} ${listOfSlides.noactiveinf}`;
  const animationCardClassesInfo =
    animationCard === false
      ? `${listOfSlides.info} ${listOfSlides.noactiveinfo}`
      : `${listOfSlides.info} ${listOfSlides.activeinfo}`;

  // Типизация функции animationHoverCard
  type AnimationHoverCard = (event: React.MouseEvent<HTMLElement>) => void;

  // Функция анимации card при наведение
  const animationHoverCard: AnimationHoverCard = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    dispatch(updateAnimationCard(!animationCard));
    const card = (event.target as HTMLElement).closest('[data-card]');
    const widthCard = (card as HTMLElement).offsetWidth;
    const inf = (card as HTMLElement).children[1];
    const info = (card as HTMLElement).children[2];
    if (animationCard === false) {
      (inf as HTMLElement).style.cssText = `
    transform: translateY(120%);
    opacity: 0;`;
      (info as HTMLElement).style.cssText = `
    transform: translateX(${-widthCard - 45}px);
    opacity: 1;`;
    } else {
      (inf as HTMLElement).style.cssText = `
    transform: translateY(0);
    opacity: 1;`;
      (info as HTMLElement).style.cssText = `
    transform: translateX(${widthCard + 45}px);
    opacity: 0;`;
    }
  };

  // Типизация функции valueSearchPaintings
  type ValueSearch = () => string;

  // Функция формирования значения для запроса paintings
  const valueSearchPaintings: ValueSearch = () => {
    if (searchValue !== '') {
      return `?_page=${index + 1}&_limit=6&q=${searchValue}`;
    }
    if (filterYearFrom !== '' && filterYearTo !== '') {
      return `?_page=${index + 1}&_limit=6&created_gte=${filterYearFrom}&created_lte=${filterYearTo}`;
    }
    return `?_page=${index + 1}&_limit=6`;
  };

  // Функция формирования значения для запроса authors
  const valueSearchAuthors: ValueSearch = () => {
    if (filterAuthor !== '') {
      return `?q=${filterAuthor}`;
    }
    return '';
  };

  // Функция формирования значения для запроса locations
  const valueSearchLocations: ValueSearch = () => {
    if (filterLoc !== '') {
      return `?q=${filterLoc}`;
    }
    return '';
  };

  const { data: paintings = [] } = useGetPaintingWhithSeachAndFiltersQuery(
    valueSearchPaintings(),
  );
  const { data: authors = [] } =
    useGetAuthorsWhithSeachAndFiltersQuery(valueSearchAuthors());
  const { data: locations = [], isLoading } =
    useGetLocationsWhithSeachAndFiltersQuery(valueSearchLocations());

  // Типизация переменных author и loc
  interface ListOptions {
    id: number;
    name?: string;
    location?: string;
  }

  // Типизация переменных painting
  interface ListPaintings {
    id: number;
    name?: string;
    location?: string;
    author: string;
    authorId: number;
    created: string;
    imageUrl: string;
    locationId: number;
  }

  // Типизация функции showPointing
  type ShowPointing = () => (JSX.Element | null)[];

  // Функция показа картин
  const showPointing: ShowPointing = () => {
    const elements: ListPaintings[] = paintings.map(
      (painting: ListPaintings) => {
        const paintingCopy = JSON.parse(JSON.stringify(painting));
        const findAuthor = authors.find(
          (author: ListOptions): ListOptions | undefined => {
            if (painting.authorId === author.id) {
              return author;
            }
            return undefined;
          },
        );
        const findLocation = locations.find(
          (loc: ListOptions): ListOptions | undefined => {
            if (painting.locationId === loc.id) {
              return loc;
            }
            return undefined;
          },
        );
        if (findAuthor && findLocation) {
          paintingCopy.author = findAuthor.name;
          paintingCopy.location = findLocation.location;
          return paintingCopy;
        }
        return null;
      },
    );

    return elements.map((elem: ListPaintings) => {
      if (elem !== null) {
        return (
          <div
            className={listOfSlides.card}
            data-card
            onMouseEnter={animationHoverCard}
            onMouseLeave={animationHoverCard}
            key={elem.id}
          >
            <img
              src={`https://test-front.framework.team${elem.imageUrl}`}
              alt="i"
            />
            <div className={animationCardClassesInf} data-inf>
              <div className={listOfSlides.name} data-name>
                {elem.name}
              </div>
              <div className={listOfSlides.year} data-year>
                {elem.created}
              </div>
            </div>
            <div data-info className={animationCardClassesInfo}>
              <div className={listOfSlides.autor} data-autor>
                {elem.author}
              </div>
              <div className={listOfSlides.location} data-loaction>
                {elem.location}
              </div>
            </div>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <>
      <Carousel>{isLoading === true ? <Spinner /> : showPointing()}</Carousel>
      <Search />
      <Filter />
    </>
  );
}

export default ListOfPeinting;
