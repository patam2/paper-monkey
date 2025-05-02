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

import ConfigureChosenElement from "./configurechosenelement"

interface AddElementFunction {
    (element: ElementType): void
}

interface ElementChooserDialogProps {
    addElement: AddElementFunction
}

import { WeatherElementSettings, WeatherElementSettingsType } from "./configurations/weather/weatherTypes" 
import { WeatherConfigureElement } from "./configurations/weather/weatherConfigure"

export default function ElementChooserDialog ({addElement}: ElementChooserDialogProps) {
    const [chosenElement, setChosenElement] = useState<ElementType | null>(null);
    const [settings, setSettings] = useState<WeatherElementSettingsType>(WeatherElementSettings.parse({}))

    useEffect(() => {
        if (!chosenElement) return
        const copy = {...chosenElement}
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
                    {chosenElement?.elementcode === 'weather' && <WeatherConfigureElement settings={settings} setSettings={setSettings}/>}
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