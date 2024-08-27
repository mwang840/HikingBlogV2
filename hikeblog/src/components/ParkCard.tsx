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
            <div className="collapse collapse-arrow">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    More Information
                </div>
                <div className="collapse-content">
                    {JSON.stringify(park.description)}
                </div>
                <div className="collapse-content">
                    {JSON.stringify(park.operatingHours)}
                </div>
            </div>
            <div className="card-actions justify-end">
                <a href={park.url}>
                    <button className="btn btn-primary">Visit Park</button>
                </a>
            </div>
        </div>
    </div>
);
