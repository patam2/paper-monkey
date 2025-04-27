import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ComboboxPopover } from "./comboboxselect"

import { ElementType } from "./comboboxselect"

interface AddElementFunction {
    (element: ElementType): void
}

interface ElementChooserDialogProps {
    addElement: AddElementFunction
}


export default function ElementChooserDialog ({addElement}: ElementChooserDialogProps) {
    const [chosenElement, setChosenElement] = useState<ElementType | null>()
    return (
        <Dialog>
            <DialogTrigger className="bg-black rounded-3xl p-2 w-full">Add new element</DialogTrigger>
            <DialogContent className="text-black">
                <DialogHeader>
                <DialogTitle>Add new element</DialogTitle>
                </DialogHeader>
                <div>
                    <ComboboxPopover setChosenElement={setChosenElement}/>
                    Selected element: {chosenElement?.label}
                </div>
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