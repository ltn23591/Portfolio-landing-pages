import { useState } from 'react';

export const useImage2Base64 = () => {
    const [base64Image, setBase64Image] = useState('');
    const [copied, setCopied] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(base64Image);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return {
        base64Image,
        copied,
        handleImageChange,
        handleCopy
    };
};
