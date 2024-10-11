/* eslint-disable @typescript-eslint/indent */
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from 'src/shared/hooks/hooksReduxUpdate';

import {
  fetchDataForAuthorsFilters,
  fetchDataForLocationsFiletrs,
  changeAuthorFilter,
  changeLocationFilter,
  changeFromYearFilter,
  changeToYearFilter,
} from '../filterSlice';

import Spinner from 'src/shared/ui/spinner';

import filterPaintings from './FilterPaintings.module.scss';

function FilterPaintings() {
  const dispatch = useAppDispatch();

  interface ReducerData {
    dataAuthorsFilter?: object | object[];
    dataLocationsFilter?: object | object[];
    statusLoadingDataForAuthorsFilter?: string;
    statusLoadingDataForLocationsFilter?: string;
  }
  interface StateReducer {
    reducerDataForFilter: ReducerData;
  }

  const dataAuthorsFilter = useAppSelector(
    (state: StateReducer) => state.reducerDataForFilter.dataAuthorsFilter,
  );
  const dataLocationsFilter = useAppSelector(
    (state: StateReducer) => state.reducerDataForFilter.dataLocationsFilter,
  );
  const statusLoadingDataForAuthorsFilter = useAppSelector(
    (state: StateReducer) =>
      state.reducerDataForFilter.statusLoadingDataForAuthorsFilter,
  );
  const statusLoadingDataForLocationsFilter = useAppSelector(
    (state: StateReducer) =>
      state.reducerDataForFilter.statusLoadingDataForLocationsFilter,
  );

  useEffect(() => {
    // Request to get data for authors
    dispatch(fetchDataForAuthorsFilters());
    // Request to get data for locations
    dispatch(fetchDataForLocationsFiletrs());
  }, [dispatch]);

  type OnCloseFilter = (event: React.MouseEvent<HTMLElement>) => void;

  // Close filter function
  const onCloseFilter: OnCloseFilter = e => {
    if ((e.target as HTMLElement).closest(`.${filterPaintings.cross}`)) {
      document
        .querySelector('#filter')
        ?.classList.remove(filterPaintings.bodyDisplay);
    }
  };

  interface Author {
    id?: number;
    name?: string;
  }
  interface Location {
    id?: number;
    location?: string;
  }

  return (
    <div className={filterPaintings.body} id="filter">
      <div
        className={filterPaintings.cross}
        role="button"
        onClick={onCloseFilter}
        onMouseDown={onCloseFilter}
      >
        &#215;
      </div>
      {statusLoadingDataForAuthorsFilter === 'loaded' &&
      statusLoadingDataForLocationsFilter === 'loaded' ? (
        <Formik
          initialValues={{
            author: '',
            location: '',
            fromYear: '',
            toYear: '',
          }}
          //  validationSchema={Yup.object().shape({
          //    author: Yup.string().required('поле обязательно для заполнения'),
          //    location: Yup.string().required('поле обязательно для заполнения'),
          //    fromYear: Yup.string().required('поле обязательно для заполнения'),
          //    toYear: Yup.string().required('поле обязательно для заполнения'),
          //  })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(changeAuthorFilter(values.author));
            dispatch(changeLocationFilter(values.location));
            dispatch(changeFromYearFilter(values.fromYear));
            dispatch(changeToYearFilter(values.toYear));
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting, handleReset }) => (
            <Form className={filterPaintings.form}>
              <div className={filterPaintings.fields}>
                <div className={filterPaintings.boxBtnTitle}>
                  <div className={filterPaintings.title}>AUTHOR</div>
                  <div className={filterPaintings.plus}>+</div>
                </div>
                <Field
                  as="select"
                  id="author"
                  name="author"
                  className={filterPaintings.fieldWide}
                >
                  <option value="" key="0">
                    Select the artist
                  </option>
                  {(dataAuthorsFilter as object[]).map((author: Author) => (
                    <option value={author.name} key={author.id}>
                      {author.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="author"
                  component="div"
                  className={filterPaintings.errorMessage}
                />
              </div>
              <div className={filterPaintings.fields}>
                <div className={filterPaintings.boxBtnTitle}>
                  <div className={filterPaintings.title}>LOCATION</div>
                  <div className={filterPaintings.plus}>+</div>
                </div>
                <Field
                  as="select"
                  id="location"
                  name="location"
                  className={filterPaintings.fieldWide}
                >
                  <option value="" key="0">
                    Select the location
                  </option>
                  {(dataLocationsFilter as object[]).map(
                    (location: Location) => (
                      <option value={location.location} key={location.id}>
                        {location.location}
                      </option>
                    ),
                  )}
                </Field>
                <ErrorMessage
                  name="location"
                  component="div"
                  className={filterPaintings.errorMessage}
                />
              </div>
              <div className={filterPaintings.fields}>
                <div className={filterPaintings.boxBtnTitle}>
                  <div className={filterPaintings.title}>YEARS</div>
                  <div className={filterPaintings.plus}>+</div>
                </div>
                <Field
                  id="fromYear"
                  name="fromYear"
                  className={filterPaintings.fieldNarrow}
                  placeholder="From"
                />
                <ErrorMessage
                  name="fromYear"
                  component="div"
                  className={filterPaintings.errorMessage}
                />
                <Field
                  id="toYear"
                  name="toYear"
                  className={filterPaintings.fieldNarrow}
                  placeholder="To"
                />
                <ErrorMessage
                  name="toYear"
                  component="div"
                  className={filterPaintings.errorMessage}
                />
              </div>
              <div className={filterPaintings.boxBtnChangeForm}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={filterPaintings.btnShowTheResults}
                >
                  SHOW THE RESULTS
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className={filterPaintings.btnClear}
                >
                  CLEAR
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default FilterPaintings;
