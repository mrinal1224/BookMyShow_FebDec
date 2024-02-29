import React, { useEffect, useState } from "react";

import { Button, Table } from "antd";
import MovieForm from "./MovieForm";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../calls/movies";
import { useDispatch } from "react-redux";
import moment from 'moment'
import {
    EditOutlined,  DeleteOutlined
  } from "@ant-design/icons";

function MovieList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies , setMovies] = useState([])
  const [selectedMovie , setSelectedMovie] = useState(null)
  const [formType , setFormType] = useState('add')


  const dispatch = useDispatch()

  console.log(selectedMovie)


  const getData = async ()=>{
     dispatch(showLoading())

     const response = await getAllMovies()

     const allMovies = response.data

     setMovies(allMovies.map(function(item){
        return {...item , key: `movie${item._id}`}
     }))
     console.log(movies)
     dispatch(hideLoading())


  }


 


  

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex : 'poster',
      render : (text , data)=>{
        return (<img width='75' height='115' style={{objectFit:'cover'}} src={data.poster}/>)  
      }
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
      render : (text)=>{
        return `${text} Min`
      }
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
      render : (text , data)=>{
        return moment(data.releaseDate).format("MM-DD-YYYY");
      }

    },
    {
      title: "Action",
      render : (text , data)=>{
        return (
            <div >
                <Button onClick={()=>{
                    setIsModalOpen(true)
                    setSelectedMovie(data)
                    setFormType('edit')
                }}><EditOutlined /></Button>
                <Button><DeleteOutlined/></Button>
            </div>
        )
      }
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
            setFormType('add')

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
          selectedMovie={selectedMovie}
          

        />
      )}
    </>
  );
}

export default MovieList;
