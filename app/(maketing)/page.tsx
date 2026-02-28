"use client";
import { Button } from "@/components/ui/button";
import { ClerkLoading , ClerkLoaded, SignedIn, SignedOut, SignUpButton, SignInButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return(
    <div className="max-w-988 mx-auto flex-1 w-full flex flex-col items-center justify-center p-4 gap-2 lg:flex-row">
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-center text-pink-600 leading-tight max-w-480">
          Learn, Practice, Ace New Languages with Ease
        </h1>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedOut>
            <SignUpButton mode="modal" fallbackRedirectUrl="/learn">
              <Button size="lg" variant="secondary" className="w-full">
                Get Started
              </Button>
            </SignUpButton>
            <SignInButton mode="modal" fallbackRedirectUrl="/learn">
              <Button size="lg" variant="primaryOutline" className="w-full">
                I already have an account
              </Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
          <Button size = "lg" variant="secondary" className="w-full" asChild>
            <Link href="/learn">
              Continue Learning
            </Link>
          </Button>
        </SignedIn>
      </ClerkLoaded>
    </div><div className="relative w-140 h-140 lg:w-100 lg:h-100 mb-8 lg:mb-0">
        <Image src="/logo.svg" fill alt="Logo" />
      </div>
    </div>
  )
}
