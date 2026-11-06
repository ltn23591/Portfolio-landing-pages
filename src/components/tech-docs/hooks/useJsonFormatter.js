import { useState, useEffect } from 'react';

export const useJsonFormatter = () => {
    const [jsonInput, setJsonInput] = useState('{\n  "name": "Le Trung Nghia",\n  "role": "Backend Specialist",\n  "skills": ["NestJS", "Node.js", "TypeScript"],\n  "isAvailable": true\n}');
    const [jsonOutput, setJsonOutput] = useState('');
    const [jsonError, setJsonError] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!jsonInput.trim()) {
            setJsonOutput('');
            setJsonError('');
            return;
        }
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonOutput(JSON.stringify(parsed, null, 2));
            setJsonError('');
        } catch (e) {
            setJsonError(e.message);
        }
    }, [jsonInput]);

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return {
        jsonInput,
        setJsonInput,
        jsonOutput,
        jsonError,
        copied,
        handleCopy
    };
};
