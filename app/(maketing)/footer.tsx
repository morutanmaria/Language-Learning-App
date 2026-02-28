import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className = "hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="lg:max-w-5xl mx-auto flex items-center justify-evenly h-full">
                <Button size = "lg" variant="ghost" className="flex-none">
                    <Image src="/us.svg" alt="English" height={40} width={40} className="mr-4 rounded-md"/>
                    English
                </Button>
                <Button size = "lg" variant="ghost" className="flex-none">
                    <Image src="/de.svg" alt="German" height={40} width={40} className="mr-4 rounded-md"/>
                    German
                </Button>
                <Button size = "lg" variant="ghost" className="flex-none">
                    <Image src="/ro.svg" alt="Romanian" height={40} width={40} className="mr-4 rounded-md"/>
                    Romanian
                </Button>
                <Button size = "lg" variant="ghost" className="flex-none">
                    <Image src="/it.svg" alt="Italian" height={40} width={40} className="mr-4 rounded-md"/>
                    Italian
                </Button>
            </div>
        </footer>
    );
};