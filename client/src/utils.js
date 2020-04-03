export function handleErrors(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

export function wait(ts) {
    return function() {
        return new Promise(resolve => setTimeout(resolve, ts, ...arguments));
    };
}
