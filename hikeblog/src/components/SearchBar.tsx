"use client";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { NPSKey } from "../app/parksKey";
import axios from "axios";
import { Park } from "@/@types/api/Park/Park";
import debounce from "lodash.debounce";

export default function SearchBar() {
    const apiUrl = "https://developer.nps.gov/api/v1/parks";
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [searchList, setSearchList] = React.useState<string[]>([]);
    const [parkData, setParkData] = React.useState<Park[]>();
    const filteredSearch = searchList.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const onSearchChange = debounce(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const { target } = event;
            if (target !== null) {
                const { value } = target;

                console.log(`querying with ${value}`);
                const searchedParks = await axios.get<Park[]>(apiUrl, {
                    params: {
                        q: value,
                        api_key: NPSKey,
                    },
                });

                const { data } = searchedParks;
                setParkData(data);
            }
        },
        750,
    );

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
            <ul></ul>
            <div>
                {filteredSearch.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    );
}
