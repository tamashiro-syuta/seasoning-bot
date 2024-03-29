import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bars3Icon } from "@heroicons/react/16/solid";
import NavigationCard, { NavigationCardProps } from "./navigation-card";
import Link from "next/link";

function AppBar() {
  const linkPages: NavigationCardProps[] = [
    { pageTitle: "和風", path: "/japanese" },
    { pageTitle: "洋風", path: "/western" },
    { pageTitle: "中華", path: "/chinese" },
    { pageTitle: "副菜", path: "/side-dish" },
    { pageTitle: "ドレッシング", path: "/dressing" },
    { pageTitle: "その他", path: "/other" },
  ];

  return (
    <Menubar className="sticky top-0 z-50 rounded-none w-full h-12 bg-primary">
      <MenubarMenu>
        <Sheet>
          <SheetTrigger asChild>
            <Bars3Icon className="w-8 h-8 py-2" />
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid grid-rows-7 py-3 h-screen gap-y-4 pr-3">
              {linkPages.map((page, index) => (
                <SheetClose asChild key={index} className="flex-grow">
                  <NavigationCard {...page} />
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </MenubarMenu>
      <MenubarMenu>
        <Link href="/">
          <h1 className="text-base font-bold">味付けbot</h1>
        </Link>
      </MenubarMenu>
    </Menubar>
  );
}

export default AppBar;
