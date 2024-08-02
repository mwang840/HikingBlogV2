import NavLinks from "./navlinks";
import Link from "next/link";
export default function NavBar(){
    return <div className={`transition duration-500 flex h-full flex-row px-3 py-4 md:px-2 bg-slate-950`}>
        <Link
                className="group transition duration-500 ease-linear flex items-end justify-start rounded-md border-slate-200 border-2 hover:bg-left-bottom hover:bg-slate-200  px-4 py-2"
                href="/"
            >
                <p className="px-2 text-slate-200 group-hover:text-slate-950 my-auto">
                    Hiking Blog
                </p>
            </Link>
     <div className="flex flex-row ml-auto mr-4 my-auto">
        <NavLinks/>
    </div>
</div>
}