import React from 'react';
import { Button } from 'antd';
import { generateSeatLayout } from '../../utils/helpers';

const SeatLayout = ({ 
  totalSeats, 
  bookedSeats = [], 
  selectedSeats = [], 
  onSeatSelect,
  columns = 12 
}) => {
  const seatLayout = generateSeatLayout(totalSeats, columns, bookedSeats, selectedSeats);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;
    onSeatSelect(seatNumber);
  };

  const getSeatClass = (seat) => {
    let className = 'seat-btn';
    if (seat.isSelected) className += ' selected';
    if (seat.isBooked) className += ' booked';
    return className;
  };

  return (
    <div className="seat-layout-container">
      {/* Screen */}
      <div className="screen-container mb-4">
        <div className="screen-div"></div>
        <p className="text-center mt-2" style={{ fontSize: '12px', color: '#666' }}>
          Screen this side
        </p>
      </div>

      {/* Seat Layout */}
      <div className="seats-container">
        {seatLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row" style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            {row.map((seat) => (
              <Button
                key={seat.number}
                className={getSeatClass(seat)}
                onClick={() => handleSeatClick(seat.number)}
                disabled={seat.isBooked}
                size="small"
                style={{ 
                  margin: '2px',
                  minWidth: '40px',
                  height: '35px',
                  fontSize: '12px'
                }}
              >
                {seat.number}
              </Button>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="seat-legend" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div className="seat-btn" style={{ width: '20px', height: '20px', fontSize: '10px' }}>A</div>
          <span style={{ fontSize: '12px' }}>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div className="seat-btn selected" style={{ width: '20px', height: '20px', fontSize: '10px' }}>S</div>
          <span style={{ fontSize: '12px' }}>Selected</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div className="seat-btn booked" style={{ width: '20px', height: '20px', fontSize: '10px' }}>B</div>
          <span style={{ fontSize: '12px' }}>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;