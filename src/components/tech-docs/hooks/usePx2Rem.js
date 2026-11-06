import { useState } from 'react';

export const usePx2Rem = () => {
    const [basePx, setBasePx] = useState(16);
    const [pxVal, setPxVal] = useState(24);
    const [remVal, setRemVal] = useState(1.5);

    const handlePxChange = (val) => {
        setPxVal(val);
        setRemVal(Number((val / basePx).toFixed(4)));
    };

    const handleRemChange = (val) => {
        setRemVal(val);
        setPxVal(Number((val * basePx).toFixed(2)));
    };

    return {
        basePx,
        setBasePx,
        pxVal,
        remVal,
        handlePxChange,
        handleRemChange
    };
};
