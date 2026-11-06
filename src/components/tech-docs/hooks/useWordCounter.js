import { useState } from 'react';

export const useWordCounter = () => {
    const [wordText, setWordText] = useState('NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.');

    const wordCount = wordText ? wordText.trim().split(/\s+/).filter(Boolean).length : 0;
    const charCount = wordText.length;
    const sentenceCount = wordText ? wordText.split(/[.!?]+/).filter(Boolean).length : 0;
    const readingTime = wordText ? Math.ceil(wordText.trim().split(/\s+/).length / 200) : 0;

    return {
        wordText,
        setWordText,
        wordCount,
        charCount,
        sentenceCount,
        readingTime
    };
};
