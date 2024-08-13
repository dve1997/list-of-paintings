import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';

import {
  updateFieldArtist,
  updateFieldLocation,
  updateFieldYears,
  updateFilter,
  updateArtist,
  updateLocation,
  updateYears,
  updateFilterAuthor,
  updateFilterLoc,
  updateFilterYearFrom,
  updateFilterYearTo,
} from '../../api/funcAppSlice';
import { useGetAuthorsQuery, useGetLocationsQuery } from '../../api/apiSlice';

import plus from '../../images/plus.svg';
import crossFilter from '../../images/cross-filter.svg';
import filterStyle from './filter.module.scss';

// Функиональный компонент фильтра
function Filter() {
  // Получение переменных из store и dispatch из хука useDispatch
  const filter = useAppSelector(state => state.funcAppSlice.filter);
  const fieldArtist = useAppSelector(state => state.funcAppSlice.fieldArtist);
  const fieldLocation = useAppSelector(
    state => state.funcAppSlice.fieldLocation,
  );
  const fieldYears = useAppSelector(state => state.funcAppSlice.fieldYears);
  const artist = useAppSelector(state => state.funcAppSlice.artist);
  const location = useAppSelector(state => state.funcAppSlice.location);
  const years = useAppSelector(state => state.funcAppSlice.years);
  const dispatch = useAppDispatch();

  const [valuesFields, setValuesFields] = useState({
    author: '',
    location: '',
    yearFrom: '',
    yearTo: '',
  });

  // Динамическое формирование классов fieldArtistClasses, fieldLocationClasses, fieldYearsClasses,
  // artistClasses, locationClasses, yearsClasses
  const fieldArtistClasses =
    fieldArtist === false
      ? filterStyle.fields
      : `${filterStyle.fields} ${filterStyle.activefields}`;
  const fieldLocationClasses =
    fieldLocation === false
      ? filterStyle.fields
      : `${filterStyle.fields} ${filterStyle.activefields}`;
  const fieldYearsClasses =
    fieldYears === false
      ? filterStyle.fields
      : `${filterStyle.fields} ${filterStyle.activefields}`;
  const artistClasses =
    artist === false
      ? `${filterStyle.select} ${filterStyle.noactiveselect}`
      : `${filterStyle.select} ${filterStyle.activeselect}`;
  const locationClasses =
    location === false
      ? `${filterStyle.select} ${filterStyle.noactiveselect}`
      : `${filterStyle.select} ${filterStyle.activeselect}`;
  const yearsClasses =
    years === false
      ? `${filterStyle.inputs} ${filterStyle.noactiveinputs}`
      : `${filterStyle.inputs} ${filterStyle.activeinputs}`;

  // Типизация функции onClickFilterArtist
  type OnClickFilter = (event: React.MouseEvent<HTMLElement>) => void;

  // Функция анимации field filters при нажатии
  const onClickFilterArtist: OnClickFilter = () => {
    dispatch(updateFieldArtist(!fieldArtist));
    dispatch(updateArtist(!artist));
  };

  // Функция анимации field filters при нажатии
  const onClickFilterLoaction: OnClickFilter = () => {
    dispatch(updateFieldLocation(!fieldLocation));
    dispatch(updateLocation(!location));
  };

  // Функция анимации field filters при нажатии
  const onClickFilterYears: OnClickFilter = () => {
    dispatch(updateFieldYears(!fieldYears));
    dispatch(updateYears(!years));
  };

  // Типизация функции onClickMenuFiltersCross
  type OnClickMenuFiltersCross = (event: React.MouseEvent<HTMLElement>) => void;

  // Функция анимации и исчезновения filters при нажатии на крестик
  const onClickMenuFiltersCross: OnClickMenuFiltersCross = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    dispatch(updateFilter(!filter));
    const filterElem = (event.target as HTMLElement).closest('[data-body]');
    const widthFilter = (filterElem as HTMLElement).offsetWidth;
    (filterElem as HTMLElement).style.cssText = `
    visibility: hidden;
    transform: translateX(${widthFilter}px);
    transition: translate;
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;`;
  };

  // Получение массива значений для фильтров author и location
  const { data: authors = [] } = useGetAuthorsQuery('');
  const { data: locations = [] } = useGetLocationsQuery('');

  // Типизация переменных author и loc
  interface ListOptions {
    id: number;
    name?: string;
    location?: string;
  }

  // Типизация функции changeValuesFiltersSelect
  type ChangeValuesFiltersSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;

  // Функция получения фильтров из полей select
  const changeValuesFiltersSelect: ChangeValuesFiltersSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const valueField = event.target.value;
    if (event.target.hasAttribute('data-authors')) {
      setValuesFields({ ...valuesFields, author: valueField });
    } else {
      setValuesFields({ ...valuesFields, location: valueField });
    }
  };

  // Типизация функции changeValuesFiltersInput
  type ChangeValuesFiltersInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  // Функция получения фильтров из полей input
  const changeValuesFiltersInput: ChangeValuesFiltersInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const valueField = event.target.value;
    if (event.target.hasAttribute('data-year-from')) {
      setValuesFields({ ...valuesFields, yearFrom: valueField });
    } else {
      setValuesFields({ ...valuesFields, yearTo: valueField });
    }
  };

  // Типизация функции createFilters
  type CreateFilters = (event: React.MouseEvent<HTMLElement>) => void;

  // Функция создания фильтров
  const createFilters: CreateFilters = () => {
    dispatch(updateFilterAuthor(valuesFields.author));
    dispatch(updateFilterLoc(valuesFields.location));
    dispatch(updateFilterYearFrom(valuesFields.yearFrom));
    dispatch(updateFilterYearTo(valuesFields.yearTo));
    (document.querySelector('[data-body]') as HTMLElement).style.visibility =
      'hidden';
    setValuesFields({
      author: '',
      location: '',
      yearFrom: '',
      yearTo: '',
    });
  };

  // Типизация функции clearFilters
  type ClearFilters = (event: React.MouseEvent<HTMLElement>) => void;

  // Функция создания фильтров
  const clearFilters: ClearFilters = () => {
    setValuesFields({
      author: '',
      location: '',
      yearFrom: '',
      yearTo: '',
    });
  };

  return (
    <div className={filterStyle.body} data-body>
      <div className={filterStyle.filters}>
        <div className={fieldArtistClasses}>
          <div
            className={filterStyle.title}
            role="button"
            onClick={onClickFilterArtist}
          >
            <div>AUTHORS</div>
            <img src={plus} alt="plus" />
          </div>
          <select
            name="artist"
            id="artist"
            className={artistClasses}
            required
            onChange={changeValuesFiltersSelect}
            data-authors
            value={valuesFields.author}
          >
            <option value="">Select the artist</option>
            {authors.map((author: ListOptions) => (
              <option value={author.name} key={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div className={fieldLocationClasses}>
          <div
            className={filterStyle.title}
            role="button"
            onClick={onClickFilterLoaction}
          >
            <div>LOCATION</div>
            <img src={plus} alt="plus" />
          </div>
          <select
            name="location"
            id="location"
            className={locationClasses}
            required
            onChange={changeValuesFiltersSelect}
            data-locations
            value={valuesFields.location}
          >
            <option value="">Select the location</option>
            {locations.map((loc: ListOptions) => (
              <option value={loc.location} key={loc.id}>
                {loc.location}
              </option>
            ))}
          </select>
        </div>
        <div className={fieldYearsClasses}>
          <div
            className={filterStyle.title}
            role="button"
            onClick={onClickFilterYears}
          >
            <div>YEARS</div>
            <img src={plus} alt="plus" />
          </div>
          <div className={yearsClasses}>
            <input
              type="text"
              placeholder="From"
              className={filterStyle.input}
              onChange={changeValuesFiltersInput}
              data-year-from
              value={valuesFields.yearFrom}
            />
            <span>—</span>
            <input
              type="text"
              placeholder="To"
              className={filterStyle.input}
              onChange={changeValuesFiltersInput}
              data-year-to
              value={valuesFields.yearTo}
            />
          </div>
        </div>
      </div>
      <div className={filterStyle.fields}>
        <button
          type="button"
          className={filterStyle.btn}
          onClick={createFilters}
        >
          SHOW THE RESULTS
        </button>
        <button
          type="button"
          className={filterStyle.btn}
          onClick={clearFilters}
        >
          CLEAR
        </button>
      </div>
      <div
        className={filterStyle.crossfilter}
        role="button"
        onClick={onClickMenuFiltersCross}
      >
        <img src={crossFilter} alt="crossFilter" />
      </div>
    </div>
  );
}

export default Filter;
