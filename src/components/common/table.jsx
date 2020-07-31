import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
      {/* <tbody>
	{paginatedMovies.map((movie, index) => (
	  <tr key={movie._id}>
		<td>{index + 1}</td>
		<td>{movie.title}</td>
		<td>{movie.genre.name}</td>
		<td>{movie.numberInStock}</td>
		<td>{movie.dailyRentalRate}</td>
		<td>
		  <Like isLiked={movie.liked} onSelectLike={() => onLike(movie)} />
		</td>
		<td>
		  <button
			className="btn btn-danger btn-sm"
			onClick={() => onDelete(movie)}
		  >
			Delete
		  </button>
		</td>
	  </tr>
	))}
  </tbody> */}
    </table>
  );
};

export default Table;
