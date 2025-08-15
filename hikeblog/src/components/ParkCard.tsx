import { Park } from "@/@types/api/Park/Park";
import Image from "next/image";
import React from "react";
import { MapIcons } from "./MapIcons";

type ParkCardProperties = {
    park: Park;
    searchQuery?: string;
};

// Function to highlight search terms in text
const highlightText = (text: string, searchQuery: string): React.ReactNode => {
    if (!searchQuery || !searchQuery.trim()) return text;
    
    const query = searchQuery.toLowerCase();
    const lowerText = text.toLowerCase();
    const index = lowerText.indexOf(query);
    
    if (index === -1) return text;
    
    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);
    
    return (
        <>
            {before}
            <mark className="bg-yellow-200 px-1 rounded">{match}</mark>
            {after}
        </>
    );
};

export const ParkCard = ({ park, searchQuery }: ParkCardProperties) => (
    <div className="card bg-base-100 image-full w-full shadow-xl rounded-md">
        <figure>
            <Image alt={park.images[0].altText} fill src={park.images[0].url} />
        </figure>
        <div className="card-body rounded-md">
            <div className="card-title flex justify-between items-start">
                <div className="flex-1">
                    {highlightText(park.fullName + ", " + park.states, searchQuery || "")}
                </div>
                {searchQuery && (park as any)._relevanceScore && (
                    <div className="badge badge-sm badge-outline ml-2">
                        Score: {(park as any)._relevanceScore}
                    </div>
                )}
            </div>
            <div className="collapse collapse-arrow">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    More Information
                </div>
                <div className="collapse-content">
                    {highlightText(park.description, searchQuery || "")}
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
