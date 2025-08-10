import { Link, Route, Routes, useParams } from "react-router-dom";
import { useGetOneTrips } from "../../hooks/useTrips";
import Comments from "./comments/Comments";
import { useAuthContext } from "../../contexts/AuthContext";
import EditComment from "./comments/editComment/EditComment";
import { CommentsProvider } from '../../contexts/CommentsContext';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';


export default function TripDetails() {
    const { tripId } = useParams();
    const { userId } = useAuthContext();
    const [trip, setTripHandler] = useGetOneTrips(tripId);

    const isOwner = trip._ownerId === userId;

    return (

        <CommentsProvider tripId={tripId}>
            <>
                <Routes>
                    <Route
                        path="comment/:commentId/edit"
                        element={
                            <EditComment
                                tripId={tripId}
                            />
                        }
                    />
                </Routes>

                <div className="bg-white">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"><br />
                                {trip.resort}</h2>
                            <img
                                alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                                src={trip.skiMap}
                                className="rounded-lg bg-gray-100"
                            />

                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"><br />
                                {`\n ${trip.numberOfLifts} Lifts _______ ${trip.kmOfSlopes} km. of Slopes`}</h2>
                            <p className="mt-4 text-gray-500">
                                {trip.description}
                            </p>
                            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">

                                <div key={'1'} className="border-t border-gray-200 pt-4">
                                    <dt className="font-medium text-gray-900">{`${trip.altitude} m.`}</dt>
                                    <dd className="mt-2 text-sm text-gray-500">Altitude</dd>
                                </div>
                                <div key={'2'} className="border-t border-gray-200 pt-4">
                                    <dt className="font-medium text-gray-900">{`${trip.skiPassPrice} $`}</dt>
                                    <dd className="mt-2 text-sm text-gray-500">Lift tickets per day</dd>
                                </div>
                                <div key={'3'} className="border-t border-gray-200 pt-4">
                                    <dt className="font-medium text-gray-900">{trip.numberOfHotels}</dt>
                                    <dd className="mt-2 text-sm text-gray-500">Hotels in the resort</dd>
                                </div>
                                <div key={'4'} className="border-t border-gray-200 pt-4">
                                    <dt className="font-medium text-gray-900">{`${trip.highestPeak} m.`}</dt>
                                    <dd className="mt-2 text-sm text-gray-500">Highest Peak</dd>
                                </div>
                                {isOwner && (
                                    <div className="flex gap-2 mt-4">
                                        <Link to={`/catalog/${tripId}/edit`}>
                                            <button
                                                type="button"
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Edit Trip"
                                            >
                                                <PencilSquareIcon className="h-16 w-16" />
                                            </button>
                                        </Link>

                                        <Link to={`/catalog/${tripId}/delete`}>
                                            <button
                                                type="button"
                                                className="text-red-600 hover:text-red-800"
                                                title="Delete Trip"
                                            >
                                                <TrashIcon className="h-16 w-16" />
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            </dl>
                        </div>
                        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                            <div className="grid-rows-2 gap-2">
                                {<Comments
                                    key={trip._id}
                                    tripId={tripId}
                                    {...trip}
                                    setTripHandler={setTripHandler}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </CommentsProvider>
    )
}

