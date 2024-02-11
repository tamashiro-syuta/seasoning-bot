import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NpmIcon } from "./icons"

export interface Seasoning {
  name: string
  quantity: string
}

interface SeasoningCardProps extends React.ComponentProps<typeof Card> {
  title: string
  description?: string
  seasonings: Seasoning[]
}

const SeasoningCard = ({ title, description, seasonings, ...props }: SeasoningCardProps) => {
  return (
    <Card className={cn("w-[380px]")} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        { description && <CardDescription>{description}</CardDescription> }
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {seasonings.map((seasoning, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <NpmIcon />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {seasoning.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {seasoning.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SeasoningCard
