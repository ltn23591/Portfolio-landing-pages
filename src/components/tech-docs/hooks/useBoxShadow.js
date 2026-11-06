import { useState } from 'react';

export const useBoxShadow = () => {
    const [shadowX, setShadowX] = useState(0);
    const [shadowY, setShadowY] = useState(12);
    const [shadowBlur, setShadowBlur] = useState(30);
    const [shadowSpread, setShadowSpread] = useState(-5);
    const [shadowColor, setShadowColor] = useState('#e11d48');
    const [shadowRadius, setShadowRadius] = useState(16);
    const [copied, setCopied] = useState(false);

    const codeString = `box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor};`;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return {
        shadowX,
        setShadowX,
        shadowY,
        setShadowY,
        shadowBlur,
        setShadowBlur,
        shadowSpread,
        setShadowSpread,
        shadowColor,
        setShadowColor,
        shadowRadius,
        setShadowRadius,
        copied,
        codeString,
        handleCopy
    };
};
