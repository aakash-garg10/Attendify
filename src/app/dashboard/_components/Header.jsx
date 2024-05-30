//WHEN A FOLDER IS CREATED WITH _name then nextjs will not create route for that folder
'use client'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import Image from "next/image"

const Header = () => {
    const { user } = useKindeBrowserClient()
    return (<>
        <div className="p-4 shadow-sm border flex justify-end">

        <div>
            <Image src={user?.picture} width={35} height={35} alt="user" className="rounded-full" />
           
        </div>
        </div>
    </>
    )
}

export default Header