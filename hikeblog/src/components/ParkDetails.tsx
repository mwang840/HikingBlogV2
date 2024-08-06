import { Card } from "@nextui-org/card";
import { NPSKey } from "../app/parksKey";
import Image from "next/image";
import { useQuery } from "react-query";
import { Park } from "@/@types/api/Park/Park";
import React from "react";

export default function ParkDetails() {
    const apiUrl = "https://developer.nps.gov/api/v1/parks";
    const [parkPic, setParkPic] = React.useState<String>("");

    const { status, data, error, refetch } = useQuery<Park[], Error, Park[]>(
        {},
    );
}
