import * as request from './requester';

const BASE_URL = "http://localhost:3030/data/resorts";

const getLatest = async () => {

    const searchParams = new URLSearchParams({
        sortBy: 'kmOfSlopes desc',
        pageSize: 3
    });

    const params = searchParams.toString().replaceAll("+", "%20");

    const result = await request.get(`${BASE_URL}?${params}`);

    return Object.values(result);
};


const getAll = async () => {
    const searchParams = new URLSearchParams({
        sortBy: 'kmOfSlopes desc',
    });

    const params = searchParams.toString().replaceAll("+", "%20");

    const result = await request.get(`${BASE_URL}?${params}`);

    return Object.values(result);
};

const getOne = (tripId) => request.get(`${BASE_URL}/${tripId}`);

const create = (tripData) => request.post(BASE_URL, tripData);

const update = (tripId, tripData) => request.put(`${BASE_URL}/${tripId}`, tripData);

const remove = (tripId) => request.del(`${BASE_URL}/${tripId}`);

const searching = async (string) => {
  const searchParams = new URLSearchParams({
    where: `resort="${string}"`,
  });

  const result = await request.get(`${BASE_URL}?${searchParams}`);
  
  return Object.values(result);
};


const tripsAPI = {
    getAll,
    getOne,
    create,
    update,
    remove,
    getLatest,
    searching
};

export default tripsAPI;