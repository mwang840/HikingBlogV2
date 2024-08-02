"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "./links";
import clsx from "clsx";
export default function NavLinks(){
    const pathName = usePathname();
    return(
        <>
            {links.map((link) => {
                return(
                    <a
                        key={link.name}
                        href={link.href}
                        className={clsx(
                        "flex h-[48px] grow scroll-smooth items-center justify-center gap-2 p-3 text-sm text-slate-200 font-medium hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                        {
                            'bg-sky-100 text-blue-600': pathName === link.href,
                        },
                    )}>
                        <p className="hidden md:block">{link.name}</p>
                    </a>
                );
            })}
        </>
    );
}