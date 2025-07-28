import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { formatDate, truncateText } from '../../utils/helpers';

const { Meta } = Card;

const MovieCard = ({ movie, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    } else {
      navigate(`/movie/${movie._id}?date=${moment().format('YYYY-MM-DD')}`);
    }
  };

  return (
    <Card
      hoverable
      style={{ width: 240, margin: '10px' }}
      cover={
        <img
          alt={movie.title}
          src={movie.poster}
          style={{ height: 360, objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = '/placeholder-movie.jpg';
          }}
        />
      }
      onClick={handleClick}
    >
      <Meta
        title={movie.title}
        description={
          <div>
            <p>{truncateText(movie.description, 80)}</p>
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
              <div>{movie.language} • {movie.genre}</div>
              <div>{formatDate(movie.releaseDate)}</div>
              <div>{movie.duration} minutes</div>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default MovieCard;