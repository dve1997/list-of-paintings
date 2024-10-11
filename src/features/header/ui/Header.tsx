import {
  useAppDispatch,
  useAppSelector,
} from 'src/shared/hooks/hooksReduxUpdate';

import { changeThemeApp } from '../headerSlice';

import header from './Header.module.scss';
import darkLogo from 'src/shared/icons/dark-logo.svg';
import lightLogo from 'src/shared/icons/light-logo.svg';
import darkBtn from 'src/shared/icons/dark-btn.svg';
import lightBtn from 'src/shared/icons/light-btn.svg';

function Header() {
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

  type OnChangeThemeApp = () => void;

  // Change theme function
  const onChangeThemeApp: OnChangeThemeApp = () => {
    // Update application theme
    dispatch(changeThemeApp(!themeApp));
  };

  return (
    <header className={header.body}>
      <div className={header.logo}>
        <img src={themeApp === false ? darkLogo : lightLogo} alt="logo" />
      </div>
      <div
        className={header.btnChangeTheme}
        role="button"
        onClick={onChangeThemeApp}
        onKeyDown={onChangeThemeApp}
      >
        <img src={themeApp === false ? darkBtn : lightBtn} alt="btn" />
      </div>
    </header>
  );
}

export default Header;
