import { useState } from 'react';

export const useUrlQuery = () => {
    const [urlInputStr, setUrlInputStr] = useState('https://example.com/search?q=nestjs&category=backend&page=2&sort=desc');

    return {
        urlInputStr,
        setUrlInputStr
    };
};
