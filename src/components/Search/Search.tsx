import { useAppDispatch, useAppSelector } from '../../hooks';

import {
  updateFilter,
  updateTumblerSearchOfFilters,
} from '../../api/funcAppSlice';

import filterr from '../../images/filter.svg';
import search from './search.module.scss';

function Search() {
  // Получение переменных из store и dispatch из хука useDispatch
  const filter = useAppSelector(state => state.funcAppSlice.filter);
  const dispatch = useAppDispatch();

  // Типизация функции changeValuesFiltersInput
  type ChangeValueSearch = (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Функция получения фильтров из полей input
  const changeValueSearch: ChangeValueSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const valueField = event.target.value;
    dispatch(updateTumblerSearchOfFilters(valueField));
  };

  // Типизация функции onClickMenuFilters
  type OnClickMenuFilters = (event: React.MouseEvent<HTMLElement>) => void;

  // Функция анимации и появления filters при нажатии на иконку
  const onClickMenuFilters: OnClickMenuFilters = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    dispatch(updateFilter(!filter));
    const filterElem = (event.target as HTMLElement).closest(
      '[data-search]',
    )?.nextElementSibling;
    const widthFilter = (filterElem as HTMLElement).offsetWidth;
    (filterElem as HTMLElement).style.cssText = `
    visibility: visible;
    transform: translateX(${-widthFilter}px);
    transition: translate;
    transition-property: transform;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
`;
  };

  return (
    <div className={search.search} data-search>
      <input
        type="search"
        className={search.searchinput}
        placeholder="Painting title"
        onInput={changeValueSearch}
      />
      <div
        className={search.filter}
        role="button"
        onClick={onClickMenuFilters}
        data-filter
      >
        <img src={filterr} alt="filter" />
      </div>
    </div>
  );
}

export default Search;
