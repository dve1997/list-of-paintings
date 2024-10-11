/* eslint-disable @typescript-eslint/indent */
import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/shared/hooks/hooksReduxUpdate';

import {
  fetchDataForListOfPaintings,
  fetchDataForAuthors,
  fetchDataForLocations,
} from '../listOfPaintingsSlice';
import useSwitchingSlide from 'src/shared/hooks/hookSwithingSlides';

import Painting from 'src/entities/painting';
import BtnsSwitchingSlides from 'src/entities/btnsSwitchingSlides';
import FilterPaintings from 'src/features/filterPaintings';
import Spinner from 'src/shared/ui/spinner';

import listOfPaintings from './ListOfPaintings.module.scss';

function ListOfPaintings() {
  const dispatch = useAppDispatch();
  const { slide, onSlideDown, onSlideUp } = useSwitchingSlide(1, 6);

  interface ReducerData {
    dataListOfPaintings?: object | object[];
    dataAuthors?: object | object[];
    dataLocations?: object | object[];
    statusLoadingDataForListOfPaintings?: string;
    statusLoadingDataForAuthors?: string;
    statusLoadingDataForLocations?: string;
    searchPaintings?: string;
    authorFilter?: string;
    locationFilter?: string;
    fromYearFilter?: string;
    toYearFilter?: string;
  }
  interface StateReducer {
    reducerDataForListOfPaintings: ReducerData;
    reducerDataForSearchPainting: ReducerData;
    reducerDataForFilter: ReducerData;
  }

  const dataListOfPaintings = useAppSelector(
    (state: StateReducer) =>
      state.reducerDataForListOfPaintings.dataListOfPaintings,
  );
  const dataAuthors = useAppSelector(
    (state: StateReducer) => state.reducerDataForListOfPaintings.dataAuthors,
  );
  const dataLocations = useAppSelector(
    (state: StateReducer) => state.reducerDataForListOfPaintings.dataLocations,
  );
  const statusLoadingDataForListOfPaintings = useAppSelector(
    (state: StateReducer) =>
      state.reducerDataForListOfPaintings.statusLoadingDataForListOfPaintings,
  );
  const statusLoadingDataForAuthors = useAppSelector(
    (state: StateReducer) =>
      state.reducerDataForListOfPaintings.statusLoadingDataForAuthors,
  );
  const statusLoadingDataForLocations = useAppSelector(
    (state: StateReducer) =>
      state.reducerDataForListOfPaintings.statusLoadingDataForLocations,
  );
  const searchPaintings = useAppSelector(
    (state: StateReducer) => state.reducerDataForSearchPainting.searchPaintings,
  );
  const authorFilter = useAppSelector(
    (state: StateReducer) => state.reducerDataForFilter.authorFilter,
  );
  const locationFilter = useAppSelector(
    (state: StateReducer) => state.reducerDataForFilter.locationFilter,
  );
  const fromYearFilter = useAppSelector(
    (state: StateReducer) => state.reducerDataForFilter.fromYearFilter,
  );
  const toYearFilter = useAppSelector(
    (state: StateReducer) => state.reducerDataForFilter.toYearFilter,
  );

  type ValueSearch = () => string;

  // Function for generating a value for a query paintings
  const valueSearchPaintings: ValueSearch = () => {
    if (searchPaintings !== '') {
      return `?_page=${slide}&_limit=6&q=${searchPaintings}`;
    }
    if (fromYearFilter !== '' && toYearFilter !== '') {
      return `?_page=${slide}&_limit=6&created_gte=${fromYearFilter}&created_lte=${toYearFilter}`;
    }
    return `?_page=${slide}&_limit=6`;
  };

  useEffect(() => {
    // Request to get data for a list of paintings
    dispatch(fetchDataForListOfPaintings(valueSearchPaintings()));
    // Request to get data for authors
    dispatch(fetchDataForAuthors(`?q=${authorFilter}`));
    // Request to get data for locations
    dispatch(fetchDataForLocations(`?q=${locationFilter}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    slide,
    searchPaintings,
    authorFilter,
    locationFilter,
    fromYearFilter,
    toYearFilter,
  ]);

  interface ListOptions {
    id?: number;
    name?: string;
    location?: string;
  }
  interface ListPaintings {
    id?: number;
    name?: string;
    location?: string;
    author?: string;
    authorId?: number;
    created?: string;
    imageUrl?: string;
    locationId?: number;
  }
  type ShowPointing = () => object[];

  // Function of displaying a list of paintings
  const showPointing: ShowPointing = () => {
    const elements: ListPaintings[] = (dataListOfPaintings as object[]).map(
      (painting: ListPaintings) => {
        const paintingCopy = JSON.parse(JSON.stringify(painting));
        const findAuthor = (dataAuthors as object[]).find(
          (author: ListOptions): ListOptions | undefined => {
            if (painting.authorId === author.id) {
              return author;
            }
            return undefined;
          },
        );
        const findLocation = (dataLocations as object[]).find(
          (loc: ListOptions): ListOptions | undefined => {
            if (painting.locationId === loc.id) {
              return loc;
            }
            return undefined;
          },
        );
        if (findAuthor && findLocation) {
          paintingCopy.author = (findAuthor as ListOptions).name;
          paintingCopy.location = (findLocation as ListOptions).location;
          return paintingCopy;
        }
        return null;
      },
    );

    return elements;
  };

  return (
    <>
      <div className={listOfPaintings.body}>
        {statusLoadingDataForListOfPaintings === 'loaded' &&
        statusLoadingDataForAuthors === 'loaded' &&
        statusLoadingDataForLocations === 'loaded' ? (
          showPointing().map((painting: ListPaintings) => {
            if (painting !== null) {
              return <Painting painting={painting} key={painting.id} />;
            }
            return null;
          })
        ) : (
          <Spinner />
        )}
      </div>
      <BtnsSwitchingSlides onSlideDown={onSlideDown} onSlideUp={onSlideUp} />
      <FilterPaintings />
    </>
  );
}

export default ListOfPaintings;
