import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./ui/sidebar-item";

type Props = {
    className?: string;
};

export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn("bg-white h-screen lg:w-64 fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
            <Link href = "/learn">
            <div className = "pt-8 pl-4 pb-7 flex items-center gap-x-3">
                <Image src="/images.svg" height = {70} width = {70} alt = "Mascot"/>
                 <h1 className = "text-2xl font-bold text-pink-600 tracking-wider">Language Learning App</h1>
            </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
            <SidebarItem label={"Learn"} iconSrc={"block_idle.svg"} href={"/learn"}></SidebarItem>
            <SidebarItem label={"Leaderboard"} iconSrc={"leaderboard.svg"} href={"/leaderboard"}></SidebarItem>
            <SidebarItem label={"Quests"} iconSrc={"quests.svg"} href={"/quests"}></SidebarItem>
            <SidebarItem label={"Shop"} iconSrc={"shop.svg"} href={"/shop"}></SidebarItem>
            </div>
        </div>
    );
};