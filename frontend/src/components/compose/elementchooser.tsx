import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ComboboxPopover } from "./comboboxselect"
import { ElementType } from "./comboboxselect"
import { WeatherConfigureElement } from "./configurations/weather/weatherConfigure"
import ConfigureChosenElement from "./configurechosenelement"
import { RSSConfigureElement } from "./configurations/rss/rssConfigure"

interface AddElementFunction {
    (element: ElementType): void
}

interface ElementChooserDialogProps {
    addElement: AddElementFunction
}

export default function ElementChooserDialog ({addElement}: ElementChooserDialogProps) {
    const [chosenElement, setChosenElement] = useState<ElementType | null>(null);
    const [settings, setSettings] = useState<any>()

    useEffect(() => {
        if (!chosenElement) return
        const copy = {...chosenElement}
        console.log(copy)
        copy.settings! = settings
        setChosenElement(copy)
    }, [settings])

    return (
        <Dialog>
            <DialogTrigger className="bg-black rounded-3xl p-2 w-full">Add new element</DialogTrigger>
            <DialogContent className="text-black">
                <DialogHeader>
                <DialogTitle>Add new element</DialogTitle>
                </DialogHeader>
                <div>
                    <ComboboxPopover setChosenElement={setChosenElement}/>
                    <ConfigureChosenElement chosenElement={chosenElement}/>
                </div>
                    {chosenElement?.id === 'weather' && <WeatherConfigureElement setSettings={setSettings}/>}
                    {chosenElement?.id === 'rss_feed' && <RSSConfigureElement setSettings={setSettings}/>}
                <DialogFooter className="justify-end">
                <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                <DialogClose asChild>
                        <Button type="button" variant="default" onClick={() => addElement(chosenElement as ElementType)}>
                            Add element
                        </Button>
                    </DialogClose>

                </DialogFooter>

        </DialogContent>
    </Dialog>

    )
}