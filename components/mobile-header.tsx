import { MobileSidebar } from "./ui/mobile-sidebar";

export const MobileHeader = () => {
    return (
        <nav className="lg:hidden px-6 h-12.5 flex items-center bg-pink-200 border-b fixed top-0 w-full z-50">
            <MobileSidebar/>
        </nav>
    );
};