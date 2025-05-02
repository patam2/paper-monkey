import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"


interface newsletterObject {
    newsletters: {
        id: number,
        userid: number,
        configuration: {
            newsletter_elements: any[]
        }
    }[]
}

const NewsletterDisplayCards = () => {
    const [newsletters, setNewsletters] = useState<newsletterObject | null>(null)
    const navigate = useNavigate()
    const createNewsletter = async () => {
        try {
          const data = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/`, {
            method: 'PUT',
            credentials: 'include',
          });
          const json = await data.json();
          if ('newsletterId' in json) {
            navigate(`/newsletter/compose/${json.newsletterId.id}`) 
          }
        } catch (error) {
          console.error("Error fetching newsletters:", error);
        }
      };

    useEffect(() => {
        const fetchElements = async () => {
          try {
            const data = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/all`, {
              method: 'GET',
              credentials: 'include',
            });
            const json = await data.json();
            setNewsletters(json)
            // Only after setting all items, mark firstUpdate as complete
            
          } catch (error) {
            console.error("Error fetching newsletters:", error);
          }
        };
        
        fetchElements();
      }, []);
    

    return (
        <div className="flex-col flex w-full items-center">
            {newsletters?.newsletters!.map((elem) => {
                return (
                    <div className="border-2 border-dashed border-black rounded-3xl p-2 w-5/6 m-2">
                        {elem.id}
                    </div>
                )
            })
            }
            <Button onClick={() => createNewsletter()} className="mt-2 w-5/6">Create newsletter</Button>
        </div>
    )
}

export default NewsletterDisplayCards

