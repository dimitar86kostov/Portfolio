
import { useEffect, useState } from "react";
import tripsAPI from "../api/trips-api";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom'

export function useGetLatestTrips() {
    const [trips, setTrips] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        (async () => {
            const result = await tripsAPI.getLatest();

            setTrips(result)
            setIsFetching(false)


        })();
    }, []);

    return [trips, setTrips, isFetching];
}


export function useGetAllTrips() {
    const [trips, setTrips] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    
    useEffect(() => {
        (
            async () => {
                try {
                    const result = await tripsAPI.getAll();
                    
                    console.log(result);
                    
                    setTrips(result);
                    setIsFetching(false)
                } catch (err) {
                    console.error(err.message);

                    if (err.message === 'Invalid access token') {
                        logout();

                        console.log("Session is restored!");

                        navigate('/');
                        return;
                    }
                }
            }
        )()
    }, []);

    return [trips, setTrips, isFetching];
}

export function useGetOneTrips(tripId) {
    const [trip, setTrip] = useState({
        resort: '',
        country: '',
        imageUrl: '',
        altitude: '',
        kmOfSlopes: '',
        numberOfLifts: '',
        numberOfHotels: '',
        skiPassPrice: '',
        highestPeak: '',
        skiMap: '',
        description: ''
    });
    const [isFetching, setIsFetching] = useState(true);
    const navigate = useNavigate();

    const setTripHandler = (trip) => {

        if (typeof trip != 'object' && trip != null) {
            return
        }
        setTrip(trip);
    }

    useEffect(() => {
        (async () => {
            try {
                setIsFetching(true)
                const result = await tripsAPI.getOne(tripId);

                setTrip(result);
                setIsFetching(false)

            } catch (err) {
                if (err.message == "Resource not found!") {
                    navigate('/404')
                }
                return alert(err.message)
            }
        })();
    }, [tripId]);

    return [
        trip,
        setTrip,
        isFetching,
        setTripHandler
    ];
}

export function useCreateTrip() {
    const create = (tripData) => tripsAPI.create(tripData);

    return { create };
}

export function useDeleteTrip() {
    const remove = (tripId) => tripsAPI.remove(tripId);

    return { remove };
}