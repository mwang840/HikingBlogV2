import Image from "next/image";
import SearchBar from "./components/searchbar";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <title>Hiking Blog</title>
      <div>
        <h1 style={{color: "blue", fontFamily: "sans-serif", fontSize:25}}> A Blog to Post Hiking Pictures and to Write Reviews about each trail</h1>
          <h3 style={{paddingLeft: "150px"}}>Go search for hiking trails around the United States</h3>
          <SearchBar/>
        </div>
    </main>
  );
}
