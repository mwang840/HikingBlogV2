import { Park } from "@/@types/api/Park/Park";
import Image from "next/image";
import React from "react";
import { MapIcons } from "./MapIcons";

type ParkCardProperties = {
    park: Park;
};

export const ParkCard = ({ park }: ParkCardProperties) => (
    <div className="card bg-base-100 image-full w-full shadow-xl rounded-md">
        <figure>
            <Image alt={park.images[0].altText} fill src={park.images[0].url} />
        </figure>
        <div className="card-body rounded-md">
            <div className="card-title">
                {park.fullName + ", " + park.states}
            </div>
            {/* <MapIcons />
            <div className="flex flex-col gap-2">
                {park.operatingHours.toString()}
                {park.addresses.toString()}
                {park.activities.toString()}
                {park.contacts.toString()}
            </div> */}
            <div className="card-actions justify-end">
                <a href={park.images[0].url}>
                    <button className="btn btn-primary">Visit Park</button>
                </a>
            </div>
        </div>
    </div>
);
