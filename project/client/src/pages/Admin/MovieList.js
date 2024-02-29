import React, { useEffect, useState } from "react";

import { Button, Table } from "antd";
import MovieForm from "./MovieForm";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../calls/movies";
import { useDispatch } from "react-redux";
import moment from 'moment'

function MovieList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies , setMovies] = useState([])


  const dispatch = useDispatch()
  const getData = async ()=>{
     dispatch(showLoading())

     const response = await getAllMovies()

     setMovies(response.data)
     dispatch(hideLoading())


  }


  

  const tableHeadings = [
    {
      title: "Poster",
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render : (data)=>{
        return moment(data.releaseDate).format("MM-DD-YYYY");
      }

    },
    {
      title: "Action",
    },
  ];

  useEffect(()=>{
    getData()
  } , [])

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add Movie
        </Button>
      </div>

      <Table dataSource={movies} columns={tableHeadings} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}

        />
      )}
    </>
  );
}

export default MovieList;
