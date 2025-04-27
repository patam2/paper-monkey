import { useState } from "react"
import { EllipsisVertical } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

interface DeleteFunc {
    (index: number): void
}
interface NewsletterItemProps {
    settings: string,
    index: number
    deleteFunction: DeleteFunc
}


export default function NewsletterItem ({settings, index, deleteFunction}: NewsletterItemProps) {
    const [itemWidth, setItemWidth] = useState('full')
    return (
        <div className={"mb-2 rounded-2xl border-stone-500 text-center text-stone-950 p-3 border-2 w-" + itemWidth}>
            <div className="w-full flex items-end justify-center">
                <p className="flex flex-1 justify-center text-xl">{settings}</p>
                <div className="flex justify-end    ms-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger><EllipsisVertical/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{settings}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteFunction(index)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


                </div>
               
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel porro veniam praesentium quia obcaecati consequatur quam dolorem libero ex iusto deserunt, minus blanditiis corrupti harum. Nulla atque error animi architecto. </p>
        </div>
    )
}