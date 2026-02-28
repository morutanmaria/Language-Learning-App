"use client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

export const Header = () => {
    return (
        <header className="h-20 w-full border-b-2 border-slate-200 px-4">
            <div className = "lg:max-w-5xl mx-auto flex items-center justify-between h-full">
                <div className = "pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/images.svg" height = {70} width = {70} alt = "Mascot"/>
                    <h1 className = "text-2xl font-bold text-pink-600 tracking-wider">Language Learning App</h1>
                </div>
                <ClerkLoading>
                    <Loader className = "h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal"  forceRedirectUrl="/learn"></SignInButton>
                        <Button size="lg" variant="ghost">Login</Button>
                    </SignedOut>
                </ClerkLoaded>
            </div>
        </header>
    );
};