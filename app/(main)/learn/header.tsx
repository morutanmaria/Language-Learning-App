import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { UserProgress } from "@/components/user-progress";

type Props = {
  title: string;
  showProgress?: boolean;
};

export const Header = ({ title, showProgress = false }: Props) => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b-2 border-slate-200">
      <div className="flex items-center gap-x-3 px-4 py-3">

        <Link href="/courses">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
          </Button>
        </Link>

        <h1 className="text-l font-bold text-pink-600 whitespace-nowrap">
          {title}
        </h1>

        <div className="flex-1" />

        {showProgress && (
          <UserProgress
            activeCourse={{ id: 1, title: "English", imageSrc: "/us.svg" }}
            hearts={5}
            points={100}
          />
        )}
      </div>
    </div>
  );
};
