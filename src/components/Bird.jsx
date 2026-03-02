import React from 'react';
import { BIRD_SIZE } from '../constants';

const Bird = ({ top }) => {
    return (
        <div
            className="absolute bg-yellow-400 rounded-full border-2 border-black"
            style={{
                top: `${top}px`,
                left: '50px',
                width: `${BIRD_SIZE}px`,
                height: `${BIRD_SIZE}px`,
                transition: 'transform 0.1s linear',
            }}
        >
            {/* Eye */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full"></div>
            {/* Beak */}
            <div className="absolute top-4 -right-2 w-4 h-3 bg-orange-500 rounded-sm"></div>
        </div>
    );
};

export default Bird;
