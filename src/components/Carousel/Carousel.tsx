import { useAppDispatch, useAppSelector } from '../../hooks';

import { updateIndex } from '../../api/funcAppSlice';

import vectorLeftDark from '../../images/vector-left-dark.svg';
import vectorRightDark from '../../images/vector-right-dark.svg';
import vectorLeftLight from '../../images/vector-left-light.svg';
import vectorRightLight from '../../images/vector-right-light.svg';
import carousel from './carousel.module.scss';

// Функиональный компонент карусели
function Carousel({ children }: { children: React.ReactNode }) {
  // Получение переменных из store и dispatch из хука useDispatch
  const theme = useAppSelector(state => state.funcAppSlice.theme);
  const index = useAppSelector(state => state.funcAppSlice.index);
  const dispatch = useAppDispatch();

  // Количество слайдов
  const quantitySlides = 6;

  // Типизация функции onChangeSlideRight
  type OnChangeSlideOfArrow = () => void;

  // Функция переключенеия слайда вперед по клику на стрелочку
  const onChangeSlideRight: OnChangeSlideOfArrow = () => {
    if (index >= 0 && index < 5) {
      dispatch(updateIndex(index + 1));
    } else {
      dispatch(updateIndex(0));
    }
  };

  // Функция переключенеия слайда назад по клику на стрелочку
  const onChangeSlideLeft: OnChangeSlideOfArrow = () => {
    if (index > 0 && index <= 5) {
      dispatch(updateIndex(index - 1));
    } else {
      dispatch(updateIndex(5));
    }
  };

  // Типизация функции onChangeSlide
  type OnChangeSlide = (event: React.MouseEvent<HTMLElement>) => void;

  // Функция переключенеия слайда по клику на цифру
  const onChangeSlide: OnChangeSlide = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    const count = (event.target as HTMLElement).textContent;
    dispatch(updateIndex(Number(count) - 1));
  };

  // Типизация функции changeNumsSlides
  type ChangeNumsSlides = () => JSX.Element[];

  // Функция изменения отображения индекса текущего слайда
  const changeNumsSlides: ChangeNumsSlides = () => {
    const quantitySlidesNums = Array.from(Array(quantitySlides).keys());
    return quantitySlidesNums.map(num => (
      <div
        data-num
        className={
          index === num ? `${carousel.num} ${carousel.numactive}` : carousel.num
        }
        role="button"
        onClick={onChangeSlide}
        key={num}
      >
        {num + 1}
      </div>
    ));
  };

  return (
    <div className={carousel.body}>
      <div className={carousel.view}>
        <div className={carousel.slides}>{children}</div>
      </div>
      <div />
      <div className={carousel.nav}>
        <div
          role="button"
          className={carousel.vectorleft}
          onClick={onChangeSlideLeft}
        >
          <img
            src={theme !== false ? vectorLeftLight : vectorLeftDark}
            alt="vectorLeft"
          />
        </div>
        <div className={carousel.nums}>{changeNumsSlides()}</div>
        <div
          role="button"
          className={carousel.vectorright}
          onClick={onChangeSlideRight}
        >
          <img
            src={theme !== false ? vectorRightLight : vectorRightDark}
            alt="vectorRight"
          />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
