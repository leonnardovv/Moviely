import React, { useState, useEffect } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  useEffect(() => {
    setMovies(getMovies());
    const genres = [{ _id: "", name: "All genres" }, ...getGenres()]; //use use _id: "" because All genres is not in genres and we will get the error regarding setting a key for each element in map
    setGenres(genres);
  }, []);

  const handleDelete = (movie) => {
    console.log("remove");
    const items = movies.filter((item) => item._id !== movie._id);
    setMovies(items);
  };

  const handleLike = (movie) => {
    const items = [...movies];
    const index = items.indexOf(movie);
    items[index] = { ...items[index] };
    items[index].liked = !items[index].liked;
    setMovies(items);
    //here we call the backend to make sure the data is persistent in db
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1); //doing this because when we select page 2 and go to a genre, we will not be getting any data because on page 2 there are no movies cause we have 3 from each
  };

  const handleSort = (sortColumn) => {
    console.log("Sort column: ", sortColumn);

    setSortColumn(sortColumn);
  };

  const getPagedData = () => {
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter((movie) => movie.genre._id === selectedGenre._id)
        : movies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: paginatedMovies };
  };

  const renderMovies = () => {
    const { totalCount, data } = getPagedData();

    if (movies.length === 0)
      return <h4>There are no movies in the database</h4>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} in the database</p>
          <MoviesTable
            sortColumn={sortColumn}
            movies={data}
            onLike={handleLike}
            onDelete={handleDelete}
            onSort={handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  };

  return <>{renderMovies()} </>;
};

export default Movies;
