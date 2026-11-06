import { useState, useEffect } from 'react';

export const useBase64Tool = () => {
    const [base64Input, setBase64Input] = useState('Hello from Portfolio Pro Max!');
    const [base64Output, setBase64Output] = useState('');
    const [base64DecodeMode, setBase64DecodeMode] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!base64Input) {
            setBase64Output('');
            return;
        }
        try {
            if (base64DecodeMode) {
                setBase64Output(atob(base64Input));
            } else {
                setBase64Output(btoa(base64Input));
            }
        } catch (e) {
            setBase64Output('Lỗi: ' + e.message);
        }
    }, [base64Input, base64DecodeMode]);

    const handleCopy = () => {
        navigator.clipboard.writeText(base64Output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return {
        base64Input,
        setBase64Input,
        base64Output,
        base64DecodeMode,
        setBase64DecodeMode,
        copied,
        handleCopy
    };
};
