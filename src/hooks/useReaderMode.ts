import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useReaderMode = () => {
    const [searchParams] = useSearchParams();
    const [isReaderMode, setIsReaderMode] = useState(false);

    useEffect(() => {
        // Check URL parameter
        const modeParam = searchParams.get('mode');

        // Check session storage
        const storedMode = sessionStorage.getItem('readerMode');

        if (modeParam === 'reader') {
            setIsReaderMode(true);
            sessionStorage.setItem('readerMode', 'true');
        } else if (storedMode === 'true') {
            setIsReaderMode(true);
        }
    }, [searchParams]);

    return isReaderMode;
};
