import { Button } from "@/components/ui/button";
import { useState } from "react";
import NewsletterItem from "./corecomponents/NewsletterItemBox";


interface NewsletterItemConfig {
    settings: string
}


export default function ComposeNewsletterPage () {
    const [newsletterItems, setNewsletterItems] = useState<NewsletterItemConfig[]>([]);

    const DeleteNewsletterByIndex = (index: number) => {
        const newItems = [...newsletterItems];
        // Remove the item at the specified index
        newItems.splice(index, 1);
        // Update state with the new array
        setNewsletterItems(newItems);

    }
    //add useeffect fetch here...
    return (
        <div className="w-5/6 flex items-center flex-col p-2 border-2 border-dashed border-black rounded-3xl">
            {newsletterItems.map((obj, index) => (
                    <NewsletterItem settings={obj.settings} index={index} deleteFunction={DeleteNewsletterByIndex}/>
                )
            )}
            <Button className="w-full" onClick={() => setNewsletterItems([...newsletterItems, {settings: "Weather"}])}>Add new element</Button>
        </div>
    )
}
