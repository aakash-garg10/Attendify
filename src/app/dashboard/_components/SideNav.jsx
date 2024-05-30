'use client'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const SideNav = () => {
    const { user } = useKindeBrowserClient()

    //jab shadcn install karte h toh lucide icons library install ho jati h
    //List of icons
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutIcon,
            path: "/dashboard"
        },
        {
            id: 2,
            name: 'Students',
            icon: GraduationCap,
            path: "/dashboard/students"
        },
        {
            id: 3,
            name: 'Attendance',
            icon: Hand,
            path: "/dashboard/attendance"
        }
    ]
//to ensure correct link is highlighted in the sidenavbar
    const path=usePathname()
    // useEffect(() => {
    //     console.log(path)
    // },[])

    return (
        <div className="border shadow-md h-screen p-5">
            <Image src={'/Logo.png'} width={200} height={200} alt="logo" />
            <hr className="my-5" />
            {menuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
                <h2  className={`flex items-center gap-3 p-4 my-5 text-md text-slate-500 hover:bg-primary hover:text-white cursor-pointer rounded-lg ${path===menu.path && 'bg-primary text-white'}`}>
                    <menu.icon />
                    {menu.name}
                </h2>
            </Link>
            ))}
            <div className="flex items-center gap-2 bottom-5 fixed">
                {/* WE HAVE TO ADD THE ERROR PATH TO DOMAIN IN THE NEXT CONFIG TO GET IMAGES FROM GOOGLE */}
                <Image src={user?.picture} width={35} height={35} alt="user" className="rounded-full" />
                <div>
                    <h2 className="text-sm font-bold">{user?.given_name} {user?.family_name}</h2>
                    <h2 className="text-xs text-slate-400">{user?.email}</h2>
                </div>
            </div>
        </div>
    )
}

export default SideNav