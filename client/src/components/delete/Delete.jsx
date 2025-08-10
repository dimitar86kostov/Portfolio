import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    IconButton,
    Typography,
    Input,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteTrip, useGetOneTrips } from "../../hooks/useTrips";
import tripsAPI from "../../api/trips-api";

export default function Delete() {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen((cur) => !cur);

    const { tripId } = useParams();
    const trip = useGetOneTrips(tripId);
    const { remove } = useDeleteTrip();
    const navigate = useNavigate();

    const deleteHandler = async () => {

        try {

            await remove(tripId);
            navigate('/catalog');

        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <section className="grid place-items-center h-screen">
            <Button onClick={handleOpen}>Open Modal</Button>
            <Dialog className="p-4" size="md" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/012/042/292/small/warning-sign-icon-transparent-background-free-png.png"
                        alt="exclamation"
                        className="w-10 h-10"
                    />
                    
                </DialogHeader>
                <DialogBody className="overflow-y-scroll">
                    <Typography color="blue-gray" className="mb-1 font-bold">
                        Delete
                    </Typography>
                    <Typography
                        variant="paragraph"
                        className="font-normal text-gray-600 max-w-lg"
                    >
                        Are you sure you want to delete {trip[0].resort} and all related comments?<br />
                        This action cannot be undone.
                    </Typography>
                    <img 
                        src={trip[0].imageUrl}
                        alt="#"
                        className="w-40 h-40"
                    />
                    <div className="p-20">
                        <Button onClick={deleteHandler} color="gray" >
                            I understand, delete this post
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </section >
    );
}
