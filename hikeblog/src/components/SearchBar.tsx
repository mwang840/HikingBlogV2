"use client";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { NPSKey } from "../app/parksKey";
import axios from "axios";
import { Park } from "@/@types/api/Park/Park";
import debounce from "lodash.debounce";
import { useQuery } from "react-query";
import Image from "next/image";

export default function SearchBar() {
    const apiUrl = "https://developer.nps.gov/api/v1/parks";
    const [search, setSearch] = React.useState<string>("");
    const { isSuccess, isLoading, isFetching, isError, data } = useQuery<
        Park[],
        Error,
        Park[]
    >({
        queryKey: `park_data_${search}`,
        queryFn: async (context) => {
            const fetchResponse = await fetch(
                `${apiUrl}?q=${search}&api_key=${NPSKey}`,
            );
            const searchedParks = await fetchResponse.json();

            const { data } = searchedParks;

            return data as Park[];
        },
    });

    const onSearchChange = debounce(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const { target } = event;
            if (target !== null) {
                const { value } = target;

                // console.log(`querying with ${value}`);
                // const searchedParks = await axios.get<Park[]>(apiUrl, {
                //     params: {
                //         q: value,
                //         api_key: NPSKey,
                //     },
                // });

                // const { data } = searchedParks;
                // setParkData(data);
                setSearch(value);
            }
        },
        750,
    );
    console.log(data)

    return (
        <div className="relative w-full">
            <label className="input input-bordered flex items-center gap-2">
                <input
                    className="grow"
                    type="text"
                    onChange={onSearchChange}
                    placeholder="Search for a park"
                    style={{
                        width: "100%",
                        padding: "10px",
                        paddingLeft: "36px",
                    }}
                />
                <FaMagnifyingGlass />
            </label>
            <ul>

                {data !== undefined && (
                    <div className="menu">
                        {data.map((eachPark, eachParkIndex) => (
                            <li
                                className={`animate-fadeIn !animate-delay-[${
                                    eachParkIndex * 1000
                                }ms]`}
                                key={`${eachPark.url}_${eachParkIndex}`}
                            >
                                <a
                                    href={eachPark.url}
                                    rel="noopener"
                                    target="_blank"
                                >
                                    {eachPark.fullName}
                                </a>
                            </li>
                        ))}
                    </div>
                )}
            </ul>
        </div>
    );
}
