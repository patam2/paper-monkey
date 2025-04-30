import { useState } from "react";


import { ElementType } from "@/components/compose/comboboxselect";
import NewsletterItem from "../components/compose/NewsletterItemBox";
import ElementChooserDialog from "@/components/compose/elementchooser";



export default function ComposeNewsletterPage () {
    const [newsletterItems, setNewsletterItems] = useState<ElementType[]>([]);
    const DeleteNewsletterByIndex = (index: number) => {
        const newItems = [...newsletterItems];
        // Remove the item at the specified index
        newItems.splice(index, 1);
        // Update state with the new array
        setNewsletterItems(newItems);

    }

    function AddNewItemToNewsletterState (element: ElementType | null): void {
        if (element && typeof element === 'object') {
            setNewsletterItems([...newsletterItems, element as ElementType])
        }
    }

    //add useeffect fetch here...
    return (
        <div className="w-5/6 flex items-center flex-col p-2 border-2 border-dashed border-black rounded-3xl">
            {newsletterItems.map((obj, index) => (
                    <NewsletterItem settings={obj.label} index={index} deleteFunction={DeleteNewsletterByIndex}/>
                )
            )}
            <ElementChooserDialog addElement={AddNewItemToNewsletterState}/>
        </div>
    )
}
