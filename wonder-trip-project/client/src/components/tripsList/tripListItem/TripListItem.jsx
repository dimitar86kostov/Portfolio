import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
    Rating,
    rating,
} from "@material-tailwind/react";

import Icon from '@mdi/react';
import { mdiSki } from '@mdi/js';
import { mdiCurrencyUsd } from '@mdi/js';
import { mdiSlopeDownhill } from '@mdi/js';
import { mdiImageFilterHdr } from '@mdi/js';



export function DefaultRating() {
    return <Rating value={4} />;
}

import { Link } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

export default function TripListItem({
    imageUrl,
    resort,
    country,
    _id,
    altitude,
    kmOfSlopes,
    numberOfLifts,
    numberOfHotels,
    skiPassPrice,
    highestPeak,
    skiMap,
    rating,
    description,
}) {

    return (

        <Card className="w-full max-w-[26rem] shadow-lg">
            <CardHeader floated={false} color="blue-gray">
                <div className="img-container">
                    <img
                        src={imageUrl}
                        alt={resort}
                    />
                </div>

                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
                <IconButton
                    size="sm"
                    color="red"
                    variant="text"
                    className="!absolute top-4 right-4 rounded-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                    >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                </IconButton>
            </CardHeader>
            <CardBody>
                <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h2" color="blue-gray" className="font-medium">
                        {resort}
                    </Typography>
                    <Rating value={rating} readonly />

                </div>
                <Typography color="gray">
                    {country}
                </Typography>
                <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                    <Tooltip content={`Ski pass: ${skiPassPrice} $ per day`}>
                        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <Icon path={mdiCurrencyUsd} size={1} />
                        </span>
                    </Tooltip>
                    <Tooltip content={`${numberOfLifts} ski lifts`}>
                        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <Icon path={mdiSki} size={1} />
                        </span>
                    </Tooltip>

                    <Tooltip content={`${numberOfHotels} hotels`}>
                        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                            </svg>
                        </span>
                    </Tooltip>

                    <Tooltip content={`${kmOfSlopes} km. of slopes`}>
                        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <Icon path={mdiSlopeDownhill} size={1} />
                        </span>
                    </Tooltip>

                    <Tooltip content={`Highest peak: ${highestPeak}m.`}>
                        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                            <Icon path={mdiImageFilterHdr} size={1} />
                        </span>
                    </Tooltip>
                </div>
            </CardBody>

            <CardFooter className="pt-1">
                <Link to={`/catalog/${_id}`}>
                    <button
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-20 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
                        type="button"
                    >
                        Details
                    </button>
                </Link>
            </CardFooter>
            {/* 
            <CardFooter className="pt-3">


            </CardFooter> */}
        </Card >
    );

}