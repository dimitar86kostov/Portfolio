'use client'
import { Card, Spinner, Typography } from "@material-tailwind/react";
import { useGetAllTrips, useGetLatestTrips } from "../../hooks/useTrips";
import TripCard from "./tripCard/TripCard";

export default function Home() {
    const [trips, setTrips, isFetching] = useGetLatestTrips();
    useGetAllTrips();

    return (
        <section className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <Typography variant="h1" className="text-4xl mb-4">
                    Find The Biggest Ski Resort
                </Typography>
                <Typography className="text-gray-800 max-w-2xl mx-auto">
                    Here you can find the 3 resorts with the most km. of slopes
                </Typography>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {isFetching ? (
                    <div className="col-span-full flex justify-center">
                        <Spinner className="h-16 w-16 text-gray-900/50" />
                    </div>
                ) : (
                    trips.map((trip) => (
                        <TripCard key={trip._id} {...trip} />
                    ))
                )}
            </div>
        </section>
    );
}


