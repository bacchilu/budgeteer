import React from 'react';

export const Page: React.FC<{children: React.ReactNode}> = function ({children}) {
    return <div className="container py-5">{children}</div>;
};
