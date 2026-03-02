import { useState, useCallback, useRef } from 'react';
import { GRAVITY, JUMP_STRENGTH, BIRD_START_Y } from '../constants';

const useBird = () => {
    const [y, setY] = useState(BIRD_START_Y);
    const velocityRef = useRef(0);

    const update = useCallback(() => {
        setY((prevY) => {
            const nextY = prevY + velocityRef.current;
            velocityRef.current += GRAVITY;
            return nextY;
        });
    }, []);

    const jump = useCallback(() => {
        velocityRef.current = JUMP_STRENGTH;
    }, []);

    const reset = useCallback(() => {
        setY(BIRD_START_Y);
        velocityRef.current = 0;
    }, []);

    return { y, update, jump, reset };
};

export default useBird;
