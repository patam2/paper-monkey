import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export type ElementType = {
    name: string,
    id: string ,
    settings: any //add type here 
}


export interface setChosenElementFunc {
    setChosenElement: (arg0: ElementType | null) => void
}
  
const statuses: ElementType[] = [
  {
    name: "RSS feed",
    id: "rss_feed",
    settings: {}
  },
  {
    name: "Weather",
    id: "weather",
    settings: {}
  },
]

export function ComboboxPopover({setChosenElement}: setChosenElementFunc) {
  const [open, setOpen] = React.useState(false)

  const [selectedStatus, setSelectedStatus] = React.useState<ElementType | null>(
    null
  )

  React.useEffect(() => {
    setChosenElement(selectedStatus)
  }, [selectedStatus])

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Element</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <>
                {selectedStatus.name}
              </>
            ) : (
              <>Choose an element</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="Search for an element..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.id}
                    value={status.id}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.id === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    <span>{status.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
