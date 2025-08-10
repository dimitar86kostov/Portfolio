import { Link } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function TripCard(trip) {
  console.log(trip);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img
        src={trip.skiMap || trip.imageUrl} 
        alt={trip.resort}
        className="h-48 w-full object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900">{trip.resort}</h3>

        <p className="mt-2 text-gray-600 flex-grow text-sm line-clamp-4">
          {trip.description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold">{trip.numberOfLifts}</span> Lifts
          </div>
          <div>
            <span className="font-semibold">{trip.kmOfSlopes}</span> km Slopes
          </div>
          <div>
            <span className="font-semibold">{trip.altitude} m</span> Altitude
          </div>
          <div>
            <span className="font-semibold">{trip.skiPassPrice} €</span> Best Price
          </div>
        </div>

        <Link
          to={`/catalog/${trip._id}`}
          className="mt-6 inline-block bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 text-center"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
