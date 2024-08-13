import { useAppDispatch, useAppSelector } from '../../hooks';

import { updateTheme } from '../../api/funcAppSlice';

import logoWhithLight from '../../images/logo-dark.svg';
import logoBlackDark from '../../images/logo-light.svg';
import lightBtn from '../../images/light-btn.svg';
import darkBtn from '../../images/dark-btn.svg';
import header from './header.module.scss';

// Функиональный компонент шапки
function Header() {
  // Получение переменных из store и dispatch из хука useDispatch
  const theme = useAppSelector(state => state.funcAppSlice.theme);
  const dispatch = useAppDispatch();

  // Типизация функции onUpdateTheme
  type OnUpdateTheme = (event: React.MouseEvent<HTMLElement>) => void;

  // Функция изменения темы
  const onUpdateTheme: OnUpdateTheme = () => {
    dispatch(updateTheme(!theme));
  };

  return (
    <header className={header.body}>
      <div className={header.logo}>
        <img
          src={theme === false ? logoBlackDark : logoWhithLight}
          alt="logoWhith"
        />
      </div>
      <div
        className={header.btn}
        data-theme
        role="button"
        onClick={onUpdateTheme}
      >
        <img src={theme === false ? darkBtn : lightBtn} alt="lightBtn" />
      </div>
    </header>
  );
}

export default Header;
