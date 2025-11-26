import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    priority = false,
    ...props
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            {...props}
        />
    );
};
