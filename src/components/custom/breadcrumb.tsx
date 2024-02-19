"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRightIcon, HomeIcon } from "./icons";
import Link from "next/link";

const pathToArray = (path: string): string[] => {
  if (path === "/") return [];
  if (path.startsWith("/")) {
    path = path.substring(1);
  }

  const pathnames = path.split("/");
  return pathnames;
};

const translateToJapanese = (path: string): string => {
  switch (path) {
    case "japanese":
      return "和風";
    case "western":
      return "洋風";
    case "chinese":
      return "中華";
    case "side-dish":
      return "副菜";
    case "dressings":
      return "ドレッシング";
    case "other":
      return "その他";
    default:
      return path;
  }
};

const Breadcrumb = () => {
  const path = usePathname();
  const [pathArray, setPathArray] = useState(pathToArray(path));

  useEffect(() => {
    setPathArray(pathToArray(path));
  }, [path]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link href="/">
            <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <HomeIcon />
              ホーム
            </span>
          </Link>
        </li>

        {pathArray.map((path) => (
          <li key={`breadcrumb-${path}`}>
            <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <ArrowRightIcon />
              {translateToJapanese(path)}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
