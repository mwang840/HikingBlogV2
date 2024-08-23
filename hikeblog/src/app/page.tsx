import Image from "next/image";
import SearchBar from "../components/SearchBar";
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <title>Hiking Blog</title>
            <div className="flex flex-col self-center gap-4">
                <h1
                    className="flex flex-col self-center text-4xl"
                    style={{
                        color: "blue",
                    }}
                >
                    {" "}
                    A Blog to Post Hiking Pictures and to Write Reviews about
                    each trail
                </h1>
                <h3 className="flex flex-col self-center text-xl">
                    Go find out more about national parks down below!
                </h3>
                <SearchBar />
            </div>
        </main>
    );
}
