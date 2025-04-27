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
    label: string,
    elementcode: string  
}
 
export interface setChosenElementFunc {
    setChosenElement: (arg0: ElementType | null) => void
}
  
const statuses: ElementType[] = [
  {
    label: "RSS feed",
    elementcode: "rss_feed",
  },
  {
    label: "Weather",
    elementcode: "weather",
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
                {selectedStatus.label}
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
                    key={status.elementcode}
                    value={status.elementcode}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.elementcode === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    <span>{status.label}</span>
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
