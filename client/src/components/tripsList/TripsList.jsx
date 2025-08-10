import { useState, useEffect } from "react";
import { Spinner, Typography } from "@material-tailwind/react";
import tripsAPI from "../../api/trips-api";
import TripListItem from "./tripListItem/TripListItem";
import Search from "../search/Search";
import { useGetAllTrips } from "../../hooks/useTrips";

export default function TripsList() {
  const [trips, setTrips] = useState([]);
  const [allTrips, , isFetching] = useGetAllTrips();
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (allTrips.length && trips.length === 0) {
      setTrips(allTrips);
    }
  }, [allTrips]);

  const searchHandler = async (query) => {
    if (!query) {
      setTrips(allTrips);
      return;
    }

    try {
      setSearchLoading(true);
      const data = await tripsAPI.searching(query);
      setTrips(data);
    } catch (error) {
      console.error("Search error:", error);
      setTrips([]);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <section className="py-10 px-8">
      <div className="mx-auto text-center mb-16">
        <Typography variant="h1" className="my-4 text-4xl">Catalog</Typography>

        <div className="mx-auto relative flex w-full max-w-[24rem]">
          <Search searching={searchHandler} loading={searchLoading} />
        </div>
      </div>

      <div className="mx-auto container">
      
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
          {searchLoading || isFetching ? (
            <Spinner className="h-16 w-16 items-center text-gray-900/50 mx-auto" />
          ) : trips.length > 0 ? (
            trips.map((trip) => (
              <TripListItem key={trip._id} {...trip} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 mb-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 10c1.657 0 3-1.343 3-3S11.657 4 10 4 7 5.343 7 7s1.343 3 3 3zM21 21l-4.35-4.35M10 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6c0 1.362-.456 2.614-1.224 3.618M9 16h2v2H9v-2z"
                />
              </svg>
              Oops! We couldn’t find any trips matching your search.
            </p>

          )}
        </div>

      </div>
    </section>
  );
}
