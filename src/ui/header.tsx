import React from 'react';

export const Header: React.FC<{title?: string; description?: string}> = function ({title, description}) {
    if (!title && !description) return null;

    return (
        <div className="text-center mb-4">
            {title ? <h1 className="display-6 fw-semibold mb-2">{title}</h1> : null}
            {description ? <p className="text-muted mb-0">{description}</p> : null}
        </div>
    );
};
