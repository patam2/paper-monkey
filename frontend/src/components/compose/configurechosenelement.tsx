import { ElementType } from "./comboboxselect";


interface ConfigureChosenElementProps {
    chosenElement: ElementType | null
}

export default function ConfigureChosenElement({chosenElement}: ConfigureChosenElementProps) {
    return <>{chosenElement?.name   }</>
}