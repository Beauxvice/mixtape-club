import React, { useContext } from "react";

/** Search component renders a search text input and button to search for songs to add to mixtapes
 * at the create-mixtapes route and is a child component of CreateMixtapes.
 */

 import { TrackContext } from "../TrackContext.jsx";


const Search = (props) => {
  const { onSearch, onSearchChange } = props;
  const { test } = useContext(TrackContext);
  return (
    <div className="navbar navbar-light rounded-lg search d-flex justify-content-md-end">
      <input
        onChange={onSearchChange}
        name='songTitle'
        style={{ maxWidth: "36.5%" }}
        className="form-control mr-sm-2 col-9"
        type="text"
        placeholder="Search Track"
        aria-label="Search Track"
      />
      <input
        onChange={onSearchChange}
        name='songArtist'
        style={{ maxWidth: "36.5%" }}
        className="form-control mr-sm-2 col-9"
        type="text"
        placeholder="Search Artist"
        aria-label="Search Artist"
      />
      <button
        className="btn btn-light border border-info my-2 my-sm-0 col-3"
        style={{ color: "#17a2b8" }}
        type="submit"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
