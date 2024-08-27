import { NPSKey } from "@/app/parksKey";
import Image from "next/image";
import { useQuery } from "react-query";
import { Park } from "@/@types/api/Park/Park";
import React from "react";
import { ParkCard } from "./ParkCard";

type ParkListProperties = {
    search: string;
};

export const ParkList = ({ search }: ParkListProperties) => {
    const apiUrl = "https://developer.nps.gov/api/v1/parks";

    const { error, status, data } = useQuery<Park[], Error, Park[]>({
        queryKey: `park_data_${search}`,
        queryFn: async (context) => {
            const fetchResponse = await fetch(
                `${apiUrl}?q=${search}&api_key=${NPSKey}`,
            );
            console.log(fetchResponse);
            const searchedParks = await fetchResponse.json();

            const { data } = searchedParks;

            return data as Park[];
        },
    });


    if (status !== "success") {
        return <span className="hidden" />;
    }
    console.log(error);
    if (error) {
        return (
            <div className="text-lg font-bold text-center">
                {"The park you searched for does not exist!"}
            </div>
        );
    }

    console.log("data = ", data);

    return (
        <div className="flex flex-col gap-4 rounded-md">
            {data.map((eachData) => (
                <ParkCard key={eachData.id} park={eachData} />
            ))}
        </div>
    );
};
