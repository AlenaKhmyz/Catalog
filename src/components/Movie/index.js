import '../../styles/styles.scss';

const placeholder = 'https://vash-master.tv/img/oshibki/knop-profilak.png';

const Movie = ({ item }) => {
  return (
    <li className="movie" key={item.imdbID}>
      <div
        className="movie__img"
        style={{
          backgroundImage: `url(${item.Poster === 'N/A' ? placeholder : item.Poster})`,
        }}
      ></div>
      <p className="movie__name">Name: {item.Title}</p>
      <p className="movie__text">Year: {item.Year}</p>
      <p className="movie__text">Type: {item.Type}</p>
      <p className="movie__text">imdbID: {item.imdbID}</p>
    </li>
  );
};

export default Movie;
