import React from "react";

const ErrorPrompt = ({ error }) => {
    if (!error) return null;
    return (
        <div>
            <h5>Error Fetching Data:</h5>
            {error.message}
        </div>
    );
};

export default ErrorPrompt;
