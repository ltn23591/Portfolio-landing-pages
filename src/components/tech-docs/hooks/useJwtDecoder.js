import { useState, useEffect } from 'react';

export const useJwtDecoder = () => {
    const [jwtInput, setJwtInput] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkxlIFRydW5nIE5naGlhIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    const [jwtHeader, setJwtHeader] = useState('');
    const [jwtPayload, setJwtPayload] = useState('');

    useEffect(() => {
        if (!jwtInput.trim()) {
            setJwtHeader('');
            setJwtPayload('');
            return;
        }
        const parts = jwtInput.split('.');
        if (parts.length >= 2) {
            try {
                const head = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
                const pay = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
                setJwtHeader(JSON.stringify(JSON.parse(head), null, 2));
                setJwtPayload(JSON.stringify(JSON.parse(pay), null, 2));
            } catch (e) {
                setJwtHeader('Lỗi giải mã: Token không hợp lệ');
                setJwtPayload('Lỗi giải mã: Token không hợp lệ');
            }
        } else {
            setJwtHeader('Token JWT phải gồm 3 phần phân tách bởi dấu chấm');
            setJwtPayload('Token JWT phải gồm 3 phần phân tách bởi dấu chấm');
        }
    }, [jwtInput]);

    return {
        jwtInput,
        setJwtInput,
        jwtHeader,
        jwtPayload
    };
};
