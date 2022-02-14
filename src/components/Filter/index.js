import React, { useEffect, useMemo, useState, useRef } from 'react';
import axios from 'axios';
import '../../styles/styles.scss';
import Pagination from '../Pagination';
import Spinner from '../Spinner';
import { throttle } from 'lodash';
import Movie from '../Movie';
import ErrorMessage from '../Error';
import UserMenu from '../UserMenu';

const moviesPerPage = 10;

const Filter = () => {
  const [term, setTerm] = useState('');
  const [movie, setMovie] = useState({});
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resultsFor, setResultsFor] = useState('');

  const search = async (seacrhTerm) => {
    if (error) {
      setError('');
    }

    try {
      if (seacrhTerm === '') {
        return;
      }

      setLoading(true);
      const result = await axios.get(`https://www.omdbapi.com/?apikey=8523cbb8&s=${seacrhTerm}`);
      setMovie(result.data);
      if (result.data.Search?.length) {
        setResultsFor(seacrhTerm);
      }

      if (resultsFor === '') {
        setError(result.data.Error);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const throttledSeacrh = useRef(throttle((seacrhTerm) => search(seacrhTerm), 1000));

  useEffect(() => throttledSeacrh.current(term), [term]);

  let totalMovie = movie.totalResults;

  const paginate = async (pageNumber) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=8523cbb8&s=${term}&page=${pageNumber}&_limit=10`
    );
    setMovie(response.data);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="page">
      <div className="header">
        <h1 className="header__title">Movie catalog</h1>
        <input
          className="header__search-movies"
          type="text"
          placeholder="Search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        ></input>

        <UserMenu />
      </div>
      <div className="wrap">
        <div className="movies">
          <div className="movies__totalResults">
            {error && <ErrorMessage errorText={error} />}
            {movie.totalResults && (
              <p className="movies__totalResults__active">
                You searched for: {resultsFor}, {movie.totalResults} results found
              </p>
            )}
          </div>
          <ul className="movies__list">
            {movie.Search && movie.Search.map((item) => <Movie item={item} />)}
          </ul>
        </div>
        {loading && <Spinner />}
        <Pagination
          moviesPerPage={moviesPerPage}
          totalMovie={totalMovie}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Filter;
