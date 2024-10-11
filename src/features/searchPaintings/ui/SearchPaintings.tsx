import {
  useAppDispatch,
  useAppSelector,
} from 'src/shared/hooks/hooksReduxUpdate';
import { useState } from 'react';

import { changeSearchPainting } from '../SearchPaintingsSlice';

import searchPaintings from './SearchPaintings.module.scss';
import darkLupe from 'src/shared/icons/dark-lupe.svg';
import lightLupe from 'src/shared/icons/light-lupe.svg';
import darkFilter from 'src/shared/icons/dark-filter.svg';
import lightFilter from 'src/shared/icons/light-filter.svg';
import filterPaintings from '../../filterPaintings/ui/FilterPaintings.module.scss';

function SearchPaintings() {
  const [search, setSearch] = useState('');

  const dispatch = useAppDispatch();

  interface ReducerHeader {
    themeApp: boolean;
  }
  interface StateReducerHeader {
    reducerHeader: ReducerHeader;
  }

  const themeApp = useAppSelector(
    (state: StateReducerHeader) => state.reducerHeader.themeApp,
  );

  type OnChangeSearch = (event: React.KeyboardEvent<HTMLInputElement>) => void;

  // Function to change the value of the search field
  const onChangeSearch: OnChangeSearch = e => {
    dispatch(changeSearchPainting((e.target as HTMLInputElement).value));
    setSearch((e.target as HTMLInputElement).value);
  };

  type OnShowFilter = () => void;

  // Show filter function
  const onShowFilter: OnShowFilter = () => {
    document
      .querySelector('#filter')
      ?.classList.add(filterPaintings.bodyDisplay);
  };

  return (
    <div className={searchPaintings.body}>
      <div className={searchPaintings.box}>
        <div className={searchPaintings.fieldSearch}>
          <input
            type="text"
            placeholder="Painting title"
            onInput={onChangeSearch}
            value={search}
          />
          <img src={themeApp === false ? darkLupe : lightLupe} alt="lupe" />
        </div>
        <div
          id="filterBtn"
          className={searchPaintings.filterBtn}
          role="button"
          onClick={onShowFilter}
          onKeyDown={onShowFilter}
        >
          <img
            src={themeApp === false ? darkFilter : lightFilter}
            alt="filter"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPaintings;
