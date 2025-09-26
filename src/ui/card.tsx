import React from 'react';

export const Card: React.FC<{children: React.ReactNode}> = function ({children}) {
    return (
        <div className="card shadow-sm">
            <div className="card-body">{children}</div>
        </div>
    );
};
