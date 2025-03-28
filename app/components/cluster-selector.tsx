"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { cn } from "~/lib/utils"

interface ClusterSelectorProps {
  onClusterChange: (clusterId: string | null) => void
}

export function ClusterSelector({ onClusterChange }: ClusterSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null)

  // In a real app, this data would come from an API call
  const clusters = [
    { id: "all", name: "All Clusters" },
    { id: "1", name: "Marketing Pages" },
    { id: "2", name: "Product Pages" },
    { id: "3", name: "Blog Articles" },
    { id: "4", name: "Landing Pages" },
    { id: "5", name: "Documentation" },
  ]

  const handleSelect = (currentValue: string) => {
    const value = currentValue === "all" ? null : currentValue
    setSelectedCluster(currentValue)
    onClusterChange(value)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[240px] justify-between">
          {selectedCluster ? clusters.find((cluster) => cluster.id === selectedCluster)?.name : "All Clusters"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Search clusters..." />
          <CommandList>
            <CommandEmpty>No cluster found.</CommandEmpty>
            <CommandGroup>
              {clusters.map((cluster) => (
                <CommandItem key={cluster.id} value={cluster.id} onSelect={handleSelect}>
                  <Check className={cn("mr-2 h-4 w-4", selectedCluster === cluster.id ? "opacity-100" : "opacity-0")} />
                  {cluster.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

