import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from 'src/shared/hooks/hooksReduxUpdate';

import HomePage from 'src/pages/homePage';
import ErrorPage from 'src/pages/errorPage';
import ErrorBoundary from 'src/shared/ui/errorBoundery';

import filterPaintings from 'src/features/filterPaintings/ui/FilterPaintings.module.scss';
import './style/index.scss';

function App() {
  interface ReducerHeader {
    themeApp: boolean;
  }
  interface StateReducerHeader {
    reducerHeader: ReducerHeader;
  }

  const themeApp = useAppSelector(
    (state: StateReducerHeader) => state.reducerHeader.themeApp,
  );

  type OnCloseFilter = (event: React.MouseEvent<HTMLElement>) => void;

  // Close filter function
  const onCloseFilter: OnCloseFilter = e => {
    if (
      !(e.target as HTMLElement).closest('#filter') &&
      !(e.target as HTMLElement).closest('#filterBtn')
    ) {
      document
        .querySelector('#filter')
        ?.classList.remove(filterPaintings.bodyDisplay);
    }
  };

  return (
    <div
      className={`wrapper ${themeApp === false ? 'dark' : 'light'}`}
      role="button"
      onClick={onCloseFilter}
    >
      <div className="conteiner">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
