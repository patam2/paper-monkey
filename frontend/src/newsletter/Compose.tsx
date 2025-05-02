import { useEffect, useState, useRef, useLayoutEffect } from 'react';

import { ElementType } from '@/components/compose/comboboxselect';
import ElementChooserDialog from '@/components/compose/elementchooser';
import WeatherNewsletterItem from '@/components/compose/configurations/weather/weatherElementItem';
import { useParams } from 'react-router';

type params = {
  id: string;
};

export default function ComposeNewsletterPage() {
  const [newsletterItems, setNewsletterItems] = useState<ElementType[]>([]);
  const firstUpdate = useRef(true);
  const { id } = useParams<params>();

  useEffect(() => {
    if (firstUpdate.current) return;
    const fetchElements = async () => {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/${id}`, {
        method: 'POST',
        body: JSON.stringify({
          newsletter_elements: newsletterItems,
        }),
        headers: {"Content-Type": "application/json"},
        credentials: 'include',
      });

      const json = await data.text();
      console.log(data.status);
    };
    fetchElements();
  }, [newsletterItems]);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const data = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
        const json = await data.json();
        
        // Important: Set the entire array at once instead of one by one
        setNewsletterItems(json.configuration.newsletter_elements);
        
        // Only after setting all items, mark firstUpdate as complete
        firstUpdate.current = false;
        
        return json;
      } catch (error) {
        console.error("Error fetching newsletter elements:", error);
      }
    };
    
    fetchElements();
  }, []);

  const DeleteNewsletterByIndex = (index: number) => {
    const newItems = [...newsletterItems];
    // Remove the item at the specified index
    newItems.splice(index, 1);
    // Update state with the new array
    setNewsletterItems(newItems);
  };

  function AddNewItemToNewsletterState(element: ElementType | null): void {
    console.log(import.meta.env.VITE_API_URL);
    if (element && typeof element === 'object') {
      setNewsletterItems(prevItems => [...prevItems, element as ElementType]);
    }
  }
  console.log(newsletterItems);
  
  return (
    <>
    <p className='text-black mb-2'>Add and configure, or delete your daily Newsletter items here.</p>
    <div className="w-5/6 flex items-center flex-col p-2 border-2 border-dashed border-black rounded-3xl">
      {newsletterItems.map((obj, index) => {
        if (obj.id === 'weather') {
          return (
            <WeatherNewsletterItem
              key={index}
              settings={obj.settings}
              index={index}
              deleteFunction={DeleteNewsletterByIndex}
            />
          );
        }
        return null; // Return null for non-weather elements
      })}
      <ElementChooserDialog addElement={AddNewItemToNewsletterState} />
    </div>

    </>
  );
}