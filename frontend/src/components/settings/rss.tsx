import { useEffect, useState } from "react"

export interface RSSTable {
    user_id: number,
    urls: string[]
}

export default function RSSSettings() {
    const [rssFeedData, setRssFeedData] = useState<RSSTable>()
    useEffect(() => {
        const get = async () => {
            const data = await fetch(`${import.meta.env.VITE_API_URL}/rss/get`, {credentials: "include", })
            const json = await data.json()
            setRssFeedData(json)
        };
        get()
    }, [])
    console.log(rssFeedData)
    return (
        <div className="flex justify-center text-black w-full mt-4">
            <span className="font-bold text-2xl">Add or delete your RSS feed subscriptions here</span>
            <ul>
                {rssFeedData && rssFeedData!.urls.map((elem) => {
                    return (
                        <li key={elem}>{elem}</li>
                    )
                })}
            </ul>
        </div>
    )
}