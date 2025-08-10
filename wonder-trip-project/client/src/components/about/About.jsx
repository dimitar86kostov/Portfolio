import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Booking() {
   
    return (
        <video className="h-full w-full rounded-lg" controls autoPlay >
            <source src="https://videos.pexels.com/video-files/3125396/3125396-uhd_2560_1440_25fps.mp4" />
            Your browser does not support the video tag.
        </video>
    );
}