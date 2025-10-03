export const LoadingPage: React.FC<{body: string}> = function ({body}) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 w-100 bg-body-secondary text-center gap-3">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="fw-medium text-body-secondary mb-0">{body}</p>
        </div>
    );
};
