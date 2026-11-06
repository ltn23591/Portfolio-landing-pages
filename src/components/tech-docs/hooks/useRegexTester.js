import { useState, useEffect } from 'react';

export const useRegexTester = () => {
    const [regexPattern, setRegexPattern] = useState('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
    const [regexText, setRegexText] = useState('Liên hệ: info@portfolio.vn hoặc nghia.dev@gmail.com');
    const [regexResult, setRegexResult] = useState('');

    useEffect(() => {
        if (!regexPattern || !regexText) {
            setRegexResult('');
            return;
        }
        try {
            const re = new RegExp(regexPattern, 'g');
            const matches = [...regexText.matchAll(re)];
            if (matches.length > 0) {
                setRegexResult(`Tìm thấy ${matches.length} kết quả khớp:\n` + matches.map((m, i) => `${i + 1}: "${m[0]}"`).join('\n'));
            } else {
                setRegexResult('Không tìm thấy kết quả khớp');
            }
        } catch (e) {
            setRegexResult('Lỗi cú pháp Regex: ' + e.message);
        }
    }, [regexPattern, regexText]);

    return {
        regexPattern,
        setRegexPattern,
        regexText,
        setRegexText,
        regexResult
    };
};
