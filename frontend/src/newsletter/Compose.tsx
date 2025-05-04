import { useEffect, useState, useRef } from 'react';

import { ElementType } from '@/components/compose/comboboxselect';
import ElementChooserDialog from '@/components/compose/elementchooser';
import WeatherNewsletterItem from '@/components/compose/configurations/weather/weatherElementItem';
import { useParams, useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';

type Params = {
  id: string;
};

export default function ComposeNewsletterPage() {
  const [newsletterItems, setNewsletterItems] = useState<ElementType[]>([]);
  const [newsletterName, setNewsletterName] = useState<string>('Newsletter');
  const [hours, setHours] = useState<string>('22');
  const [minutes, setMinutes] = useState<string>('59');
  const isInitialLoad = useRef(true);
  const { id } = useParams<Params>();

  // Effect for saving changes
  useEffect(() => {
    // Skip the first render
    if (isInitialLoad.current) return;
    
    const saveChanges = async () => {
      try {
        const formatedHours = hours.padStart(2, '0')
        const formatedMinutes = minutes.padStart(2, '0')
        const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/${id}`, {
          method: 'POST',
          body: JSON.stringify({
            name: newsletterName,
            utctime: `${formatedHours}:${formatedMinutes}:00`,
            newsletter_elements: newsletterItems,
          }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Failed to save newsletter:', response.status);
        }
      } catch (error) {
        console.error('Error saving newsletter:', error);
      }
    };

    saveChanges();
  }, [newsletterItems, newsletterName, hours, minutes, id]);

  // Effect for initial data loading
  useEffect(() => {
    const fetchNewsletterData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch newsletter: ${response.status}`);
        }
        
        const data = await response.json();

        setNewsletterItems(data.configuration.newsletter_elements || []);
        setNewsletterName(data.name || 'Newsletter');
        
        const timeComponents = (data.utctime || '23:59:00').split(':');
        setHours(timeComponents[0] || '23');
        setMinutes(timeComponents[1] || '59');
        
        isInitialLoad.current = false;
      } catch (error) {
        console.error('Error fetching newsletter data:', error);
        isInitialLoad.current = false;
      }
    };

    fetchNewsletterData();
  }, [id]);

  const deleteNewsletterItem = (index: number) => {
    setNewsletterItems(currentItems => {
      const newItems = [...currentItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  const addNewsletterItem = (element: ElementType | null) => {
    if (element && typeof element === 'object') {
      setNewsletterItems(currentItems => [...currentItems, element]);
    }
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    if (value === "" || (value.length <= 2 && /^\d*$/.test(value))) {
      setHours(value);
      if (value.length > 0) {
        const numValue = parseInt(value, 10)
        if (numValue > 23) {
            setHours('23')
        }
      }
    } else if (value === '') {
      setHours('');
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    const numValue = parseInt(value, 10);
    if (value === '' || (value.length <= 2 && /^\d*$/.test(value))) {
        setMinutes(value);
        
        // Only validate ranges if we have a complete value
        if (value.length > 0) {
          const numValue = parseInt(value, 10);
          if (numValue > 59) {
            setMinutes('59'); // Cap at maximum allowed value
          }
        }
      }  
    };

  const handleHoursBlur = () => {
    if (hours === '') {
      setHours('00');
    } else {
      setHours(hours.padStart(2, '0'));
    }
  };

  const handleMinutesBlur = () => {
    if (minutes === '') {
      setMinutes('00');
    } else {
      setMinutes(minutes.padStart(2, '0'));
    }
  };

  return (
    <>
      <p className="text-black mb-2">Add and configure, or delete your daily Newsletter items here.</p>
      <div className="flex flex-col items-center mx-auto w-full max-w-4xl mb-3">
  {/* Container for newsletter configuration */}
  <div className="flex flex-col md:flex-row items-center justify-center w-5/6 text-xl text-black gap-2">
    <span className="whitespace-nowrap">Newsletter named</span>
    <Input
      onChange={(e) => setNewsletterName(e.target.value)}
      value={newsletterName}
      placeholder="Newsletter"
      className="md:w-1/4 w-full border-black text-xl"
    />
    <span className="whitespace-nowrap md:ml-4">going out at GMT time</span>
    <div className="flex flex-row items-center">
      <Input
        onChange={handleHoursChange}
        onBlur={handleHoursBlur}
        value={hours}
        inputMode="numeric"
        placeholder="00"
        maxLength={2}
        className="w-16 border-black text-center"
      />
      <span className="mx-1 text-xl font-bold">:</span>
      <Input
        onChange={handleMinutesChange}
        onBlur={handleMinutesBlur}
        value={minutes}
        placeholder="00"
        inputMode="numeric"
        maxLength={2}
        className="w-16 border-black text-center"
      />
    </div>
  </div>
</div>
      <div className="w-5/6 flex items-center flex-col p-2 border-2 border-dashed border-black rounded-3xl">
        {newsletterItems.map((item, index) => {
          if (item.id === 'weather') {
            return (
              <WeatherNewsletterItem
                key={index}
                settings={item.settings}
                index={index}
                deleteFunction={deleteNewsletterItem}
              />
            );
          }
          return null; // Return null for non-weather elements
        })}
        <ElementChooserDialog addElement={addNewsletterItem} />
      </div>
    </>
  );
}