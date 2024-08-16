"use client";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import debounce from "lodash.debounce";
import { ParkList } from "./ParkList";

export default function SearchBar() {
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
        <div className="flex flex-col w-full">
            <label className="input input-bordered self-center flex items-center gap-2 w-[40rem] relative">
                <input
                    className="flex pl-10"
                    type="text"
                    onChange={onSearchChange}
                    placeholder="Search for a park"
                    // style={{
                    //     width: "35px",
                    //     padding: "10px",
                    //     paddingLeft: "36px",
                    // }}
                />
                <FaMagnifyingGlass className="absolute right-2" />
            </label>
            <ParkList search={search} />
        </div>
    );
}
