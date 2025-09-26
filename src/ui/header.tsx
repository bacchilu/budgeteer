import React from 'react';

export const Header: React.FC<{title: string; description: string}> = function ({title, description}) {
    return (
        <div className="text-center mb-4">
            <h1 className="display-6 fw-semibold mb-2">{title}</h1>
            <p className="text-muted mb-0">{description}</p>
        </div>
    );
};
