import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export interface NavigationCardProps extends React.ComponentProps<typeof Card> {
  pageTitle: string;
  path: string;
}

const NavigationCard = ({ pageTitle, path, ...props }: NavigationCardProps) => {
  return (
    <Link href={path}>
      <Card className="h-full py-2" {...props}>
        <CardHeader>
          <CardTitle>{pageTitle}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default NavigationCard;
