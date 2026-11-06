import { useState } from 'react';

export const useGlassmorphism = () => {
    const [glassBlur, setGlassBlur] = useState(16);
    const [glassOpacity, setGlassOpacity] = useState(0.2);
    const [glassBorder, setGlassBorder] = useState(0.15);
    const [glassRadius, setGlassRadius] = useState(20);
    const [copied, setCopied] = useState(false);

    const cssCode = `background: rgba(15, 23, 42, ${glassOpacity});\nborder-radius: ${glassRadius}px;\nborder: 1px solid rgba(255, 255, 255, ${glassBorder});\nbackdrop-filter: blur(${glassBlur}px);`;
    const tailwindCode = `bg-slate-900/${Math.round(glassOpacity * 100)} backdrop-blur-[${glassBlur}px] border border-white/${Math.round(glassBorder * 100)} rounded-[${glassRadius}px]`;

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return {
        glassBlur,
        setGlassBlur,
        glassOpacity,
        setGlassOpacity,
        glassBorder,
        setGlassBorder,
        glassRadius,
        setGlassRadius,
        copied,
        cssCode,
        tailwindCode,
        handleCopy
    };
};
