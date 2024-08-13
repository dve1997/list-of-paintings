import errorStyle from './pageError.module.scss';
import error from '../../images/error.png';

function PageError() {
  return (
    <div className={errorStyle.error}>
      <h3>Возникла ошибка, указанной странцы не существует.</h3>
      <img src={error} alt="error" />
    </div>
  );
}

export default PageError;
