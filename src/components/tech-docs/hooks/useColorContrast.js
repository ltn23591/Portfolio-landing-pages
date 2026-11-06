import { useState } from 'react';

export const useColorContrast = () => {
    const [textColor, setTextColor] = useState('#ffffff');
    const [bgColor, setBgColor] = useState('#0ea5e9');

    const getLuminance = (hex) => {
        const rgb = hex.replace('#', '').match(/.{2}/g).map(x => {
            let val = parseInt(x, 16) / 255;
            return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    };

    const l1 = getLuminance(textColor);
    const l2 = getLuminance(bgColor);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    const normalAA = ratio >= 4.5 ? 'PASS' : 'FAIL';
    const normalAAA = ratio >= 7 ? 'PASS' : 'FAIL';
    const largeAA = ratio >= 3 ? 'PASS' : 'FAIL';
    const largeAAA = ratio >= 4.5 ? 'PASS' : 'FAIL';

    return {
        textColor,
        setTextColor,
        bgColor,
        setBgColor,
        ratio,
        normalAA,
        normalAAA,
        largeAA,
        largeAAA
    };
};
