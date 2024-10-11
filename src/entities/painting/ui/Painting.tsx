import { BASE_URL } from 'src/shared/hooks/hookHTTP';

import paintingStyle from './Painting.module.scss';

interface PaintingProps {
  id?: number;
  name?: string;
  location?: string;
  author?: string;
  authorId?: number;
  created?: string;
  imageUrl?: string;
  locationId?: number;
}
interface ListPaintingsProps {
  painting: PaintingProps;
}

function Painting(props: ListPaintingsProps) {
  const { painting } = props;
  const { name, location, author, created, imageUrl } = painting;

  return (
    <div className={paintingStyle.body}>
      <img src={BASE_URL + imageUrl} alt="img" />
      <div className={paintingStyle.infAboutAutorAndYear}>
        <div className={paintingStyle.title}>{name}</div>
        <div className={paintingStyle.descr}>{created}</div>
      </div>
      <div className={paintingStyle.infAboutNameAndMuseum}>
        <div className={paintingStyle.title}>{author}</div>
        <div className={paintingStyle.descr}>{location}</div>
      </div>
    </div>
  );
}

export default Painting;
