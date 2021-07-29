import React, { useState } from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";
import TextInput from "./shared/components/TextInput";
import Card from "./shared/components/Card";
import { makeGet } from "./services/api.service";
import URL from "./constants/url.constants";

function App() {
  const [searchInp, updateSearch] = useState("");
  const [noResponse, SetNoresponse] = useState(false);
  const [loading, isloading] = useState(false);
  const [movieInfo, updateResult] = useState({
    Title: "",
    Released: "",
    Genre: [],
    Plot: "",
  });

  const handleSearchChange = (e: any) => {
    updateSearch(e.target.value);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    isloading(true);
    makeGet(`${URL.MOVIE_API}&t=${searchInp}`).then(
      (response) => {
        if (response.Response === "True") {
          SetNoresponse(false);
          const { Title, Released, Genre, Plot } = response;
          const GenreList = Genre ? Genre.split(",") : [];
          updateResult({ Title, Released, Genre: GenreList, Plot });
          console.log(response);
          isloading(false);
        } else {
          SetNoresponse(true);
          isloading(false);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <MovieFinderWrapper>
      <SearchWrap>
        <TextInput
          placeholder="Please enter movie name"
          onChange={handleSearchChange}
          value={searchInp}
        ></TextInput>
        <SearchBtn disabled={loading} onClick={handleSearch}>
          Search
        </SearchBtn>
      </SearchWrap>
      <SearchResults>
        <MovieCard>
          {noResponse ? (
            "No results found"
          ) : (
            <React.Fragment>
              <Title>{movieInfo.Title}</Title>
              <Year>{movieInfo.Released}</Year>
              <Genre>
                {movieInfo.Genre && movieInfo.Genre.length
                  ? movieInfo.Genre.map((item: any, index: number) => {
                      return <GenreItem key={index}>{item}</GenreItem>;
                    })
                  : null}
              </Genre>
              <Plot>{movieInfo.Plot}</Plot>
            </React.Fragment>
          )}
        </MovieCard>
      </SearchResults>
    </MovieFinderWrapper>
  );
}

export default App;

const MovieFinderWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SearchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: center;
  align-items: center;
`;
const SearchResults = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
const SearchBtn = styled.button`
  height: 40px;
  color: #fff;
  background: blue;
  outline: none;
`;

const MovieCard = styled(Card)`
  margin-top: 20px;
`;

const Title = styled.div`
  margin: 8px 0;
`;
const Year = styled.div`
  margin: 8px 0;
`;
const Genre = styled.ul`
  margin: 8px 0;
  list-style: none;
  display: flex;
  justify-content: start;
`;
const GenreItem = styled.li`
  list-style: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 10px;
`;
const Plot = styled.div`
  margin: 8px 0;
`;
