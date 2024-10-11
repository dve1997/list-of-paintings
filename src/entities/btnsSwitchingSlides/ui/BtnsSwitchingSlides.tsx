import btnsSwitchingSlides from './BtnsSwitchingSlides.module.scss';

interface BtnsSwitchingSlidesProps {
  onSlideDown: () => void;
  onSlideUp: () => void;
}

function BtnsSwitchingSlides(props: BtnsSwitchingSlidesProps) {
  const { onSlideDown, onSlideUp } = props;

  return (
    <div className={btnsSwitchingSlides.arrows}>
      <div
        className={btnsSwitchingSlides.arrowLeft}
        role="button"
        onClick={onSlideDown}
        onKeyDown={onSlideDown}
      >
        &#9668;
      </div>
      <div
        className={btnsSwitchingSlides.arrowRight}
        role="button"
        onClick={onSlideUp}
        onKeyDown={onSlideUp}
      >
        &#9658;
      </div>
    </div>
  );
}

export default BtnsSwitchingSlides;
