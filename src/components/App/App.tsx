import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { updateFilter } from '../../api/funcAppSlice';

import Header from '../Header/Header';
import PageError from '../../pages/PageError/PageError';
// import ErrorBoundary from '../ErrorBoundery/ErrorBoundery';
import PageListOfPainting from '../../pages/PageListOfPainting';

import './styles/index.scss';

// Функциональный компонет App
function App() {
  // Получение переменных из store и dispatch из хука useDispatch
  const theme = useAppSelector(state => state.funcAppSlice.theme);
  const filter = useAppSelector(state => state.funcAppSlice.filter);
  const dispatch = useAppDispatch();

  // Типизация функции onClickMenuFilterField
  type OnClickMenuFilterField = (event: React.MouseEvent<HTMLElement>) => void;

  // Функция анимации и исчезновения filters при нажатии вне облости фильтра
  const onClickMenuFilterField: OnClickMenuFilterField = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    if (
      !(event.target as HTMLElement).closest('[data-body]') &&
      !(event.target as HTMLElement).closest('[data-filter]') &&
      !(event.target as HTMLElement).closest('[data-theme]')
    ) {
      dispatch(updateFilter(!filter));
      const filterElem = document.querySelector('[data-body]');
      const widthFilter = (filterElem as HTMLElement).offsetWidth;
      (filterElem as HTMLElement).style.cssText = `
      visibility: hidden;
      transform: translateX(${widthFilter}px);
      transition: translate;
      transition-property: all;
      transition-duration: 300ms;
      transition-timing-function: ease-in-out;`;
    }
  };

  return (
    <div className={`wrapper ${theme === false ? 'dark' : 'light'}`}>
      <div
        className="conteiner"
        aria-label="onClickMenuFilterField"
        role="button"
        onClick={onClickMenuFilterField}
      >
        <Router basename="/list-of-paintings/">
          <Header />
          <Routes>
            <Route path="/" element={<PageListOfPainting />} />
            <Route path="*" element={<PageError />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
