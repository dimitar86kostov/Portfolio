import { getAccessToken } from "../utils/authUtils";

async function requester(method, url, data) {
    const options = {};

    // const accessToken = localStorage.getItem('accessToken');
    const accessToken = getAccessToken();

    options.method = method;

    if (accessToken) {
        options.headers = {
            ...options.headers,
            'x-authorization': accessToken,
        }
    }

    if (data) {
        options.headers = {
            ...options.headers,
            'Content-type': 'application/json'
        }

        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    if (response.status === 204) {
        return;
    }
    if (response.status === 403) {

        localStorage.clear();
        console.log("Session is restored!");

        return;
    }

    const result = await response.json();
    if (!response.ok) {
        console.error(result);
        throw result;
    }

    return result;

}

export const get = requester.bind(null, 'GET')
export const post = requester.bind(null, 'POST')
export const put = requester.bind(null, 'PUT')
export const del = requester.bind(null, 'DELETE')