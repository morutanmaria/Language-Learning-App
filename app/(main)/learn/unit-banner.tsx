import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
    description: string;
};

export const UnitBanner = ({title, description}: Props) => {
    return (
        <div className="w-full bg-pink-500 text-white flex items-center justify-between p-5 rounded-xl mb-6">
            <div>
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-lg">{description}</p>
            </div>
            <Link href="/lesson">
                <Button size="lg" variant="primary" className="hidden lg:flex border-2 border-b-4 active:border-b-2">
                    <NotebookText className="mr-2"/>
                    Continue
                </Button>
            </Link>
        </div>
    );
}