import * as request from './requester';

const BASE_URL = 'http://localhost:3030/data/comments';

const getAll = (tripId) => {
    return request.get(`/api/comments/${tripId}`);
};

const getById = (tripId) => {
    return request.getById(`/api/comments/${tripId}`);
}

const create = (tripId, text, author) => {
    return request.post(BASE_URL, { tripId, text, author });
};

const update = (commentId, commentData) => {
    return request.put(`${BASE_URL}/${commentId}`, commentData);
};


const createReply = (commentId, replyData) => {
    return request.post(`${BASE_URL}/${commentId}/replies`, replyData);
};

const editReply = (commentId, replyId, text) => {
    return request.put(`${BASE_URL}/${commentId}/replies/${replyId}`, { text });
};

const deleteReply = (commentId, replyId) => {
    return request.del(`${BASE_URL}/${commentId}/replies/${replyId}`);
};

export default {
    getAll,
    create,
    update,
    getById,
    createReply,
    editReply,
    deleteReply,
};

