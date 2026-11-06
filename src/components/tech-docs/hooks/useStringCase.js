import { useState } from 'react';

export const useStringCase = () => {
    const [caseInputText, setCaseInputText] = useState('nestjs backend architecture');

    const convertStringCase = (text, type) => {
        if (!text) return '';
        const words = text.toLowerCase().split(/[^a-zA-Z0-9]/).filter(Boolean);
        switch (type) {
            case 'camel':
                return words.map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join('');
            case 'snake':
                return words.join('_');
            case 'pascal':
                return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
            case 'kebab':
                return words.join('-');
            default:
                return text;
        }
    };

    return {
        caseInputText,
        setCaseInputText,
        convertStringCase
    };
};
