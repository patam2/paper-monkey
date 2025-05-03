import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"
import { Cross, DeleteIcon, Trash } from "lucide-react"
import { number } from "zod"


interface newsletterObject {
    newsletters: {
        id: number,
        userid: number,
        name: string,
        utctime: string,
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

    const deleteNewsletter = async (id: number) => {
      try {
        console.log(id)
        const data = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        if (data.status === 200) {
          const oldItems = [...newsletters!.newsletters]
          oldItems.map((elem, index) => {
            if (elem.id === id) {
              oldItems.splice(index, 1)
            }
          })
          setNewsletters({'newsletters': oldItems})
        }
      } catch (error) {
        console.error("Error fetching newsletters:", error);
      }

    }

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
                    <div key={elem.id} onClick={() => navigate(`/newsletter/compose/${elem.id}`)} className="flex justify-between border-2 border-dashed text-black border-black rounded-3xl p-2 w-5/6 m-2 hover:scale-105 hover:border-gray-800 transition-all hover:cursor-pointer">
                        <div>
                          <span className="ms-1 font-bold">{elem.name}</span> | goes out every day <span className="text-gray-800">{elem.utctime.slice(0,5)}</span>, {elem.configuration.newsletter_elements.length} element                        
                        </div>
                        <div>
                          <Trash onClick={() => {deleteNewsletter(elem.id)}}/>
                        </div>
                    </div>
                )
            })
            }
            <Button onClick={() => createNewsletter()} className="mt-2 w-5/6">Create newsletter</Button>
        </div>
    )
}

export default NewsletterDisplayCards

