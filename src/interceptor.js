const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
    let [resource, config] = args;
    let response = await originalFetch(resource, config);

    if (!response.ok && response.status === 401) {
        localStorage.removeItem("token")
        window.location.replace("/authorize");
        return Promise.reject(response);
    }
    return response;
};

const fetchWithInterceptor = fetch

export default fetchWithInterceptor