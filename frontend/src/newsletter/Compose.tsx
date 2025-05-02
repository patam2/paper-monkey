import { useEffect, useState, useRef, useLayoutEffect } from "react";


import { ElementType } from "@/components/compose/comboboxselect";
import NewsletterItem from "../components/compose/NewsletterItemBox";
import ElementChooserDialog from "@/components/compose/elementchooser";

import { useParams } from "react-router";


type params = {
    id: string
}

export default function ComposeNewsletterPage () {
    const [newsletterItems, setNewsletterItems] = useState<ElementType[]>([]);
    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            console.log('sgjoierjgerio')
            return
        }
    })
    const { id } = useParams<params>()


    useEffect(() => {
        const fetchElements = async () => {
            const data = await fetch(
                `${import.meta.env.VITE_API_URL}/newsletter/${id}`, 
                {
                    'method': "GET", 
                    'credentials': 'include'
                }
            )
            const json = await data.json()
            console.log(json)
            return json
        }
        fetchElements()
    }, []);

    useEffect(() => {
        if (firstUpdate) return
        const fetchElements = async () => {
            const data = await fetch(
                `${import.meta.env.VITE_API_URL}/newsletter/${id}`, 
                {
                    'method': "POST",
                    'body': JSON.stringify({
                        'newsletter_items': newsletterItems
                    }),
                    'credentials': 'include'
                }
            )
            
            const json = await data.text()
            console.log(json, data.status)
        };
        fetchElements()
}, [newsletterItems]);

    const DeleteNewsletterByIndex = (index: number) => {
        const newItems = [...newsletterItems];
        // Remove the item at the specified index
        newItems.splice(index, 1);
        // Update state with the new array
        setNewsletterItems(newItems);

    }

    function AddNewItemToNewsletterState (element: ElementType | null): void {
        console.log(import.meta.env.VITE_API_URL)
        if (element && typeof element === 'object') {
            setNewsletterItems([...newsletterItems, element as ElementType])
        }
    }
    console.log(newsletterItems)
    //add useeffect fetch here...
    return (
        <div className="w-5/6 flex items-center flex-col p-2 border-2 border-dashed border-black rounded-3xl">
            {newsletterItems.map((obj, index) => (

                    <NewsletterItem settings={obj.settings} index={index} deleteFunction={DeleteNewsletterByIndex}/>
                )
            )}
            <ElementChooserDialog addElement={AddNewItemToNewsletterState}/>
        </div>
    )
}
