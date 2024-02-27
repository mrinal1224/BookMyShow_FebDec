import React , {useState} from 'react'
import { Button, Table } from 'antd'
import MovieForm from './MovieForm';

function MovieList() {

    const [isModelOpen , setIsModelOpen] = useState(false)



    const movies = [
        {
          key: '1',
          poster: 'Image1',
          name: 'Mastaney',
          description: 'Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ',
          duration: 120,
          genre: "Action",
          language: "Hindi",
          releaseDate: "Oct  25, 2023",
        },
        {
          key: '2',
          poster: 'Image2',
          name: 'Mastaney',
          description: 'Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ',
          duration: 120,
          genre: "Action",
          language: "Hindi",
          releaseDate: "Oct  25, 2023",
          action: "Delete"
        },
        
      ]; 
    
 
const tableHeadings = [
    {
        title : "Poster"
    },
    {
        title : "Movie Name",
        dataIndex : 'name'
    },
    {
        title : "Description",
        dataIndex : 'description'
    },
    {
        title : "Duration",
        dataIndex: 'duration',
    },
    {
        title : "Genre",
        dataIndex: 'genre',
    },
    {
        title : "Language",
        dataIndex: 'language'
    },
    {
        title : "Release Date",
        dataIndex: 'releaseDate'
    },
    {
        title : "Action"
    },
]


  return (
    <>

      <div className='d-flex justify-content-end'>
      <Button onClick={()=> {setIsModelOpen(true)}}>Add Movie</Button>
      </div>

        
        <Table dataSource={movies} columns={tableHeadings}/>
        {isModelOpen && <MovieForm open={isModelOpen}/>}




    </>
  )
}

export default MovieList