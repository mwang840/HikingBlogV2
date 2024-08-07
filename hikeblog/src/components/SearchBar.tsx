"use client";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { NPSKey } from "../app/parksKey";
import { Park } from "@/@types/api/Park/Park";
import debounce from "lodash.debounce";
import { useQuery } from "react-query";
import { ParkList } from "./ParkList";

export default function SearchBar() {
    const apiUrl = "https://developer.nps.gov/api/v1/parks";
    const [search, setSearch] = React.useState<string>("");

    const onSearchChange = debounce(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const { target } = event;
            if (target !== null) {
                const { value } = target;
                setSearch(value);
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
            <ParkList search={search} />
        </div>
    );
}
