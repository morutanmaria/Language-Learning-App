"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/app/store/use-hearts-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

export const HeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close} = useHeartsModal();

    useEffect(() => setIsClient(true), []);

    if(!isClient){
        return null;
    }
    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/saw_b.svg" alt="Saw_b" height={80} width={80}/>
                    </div>
                    <DialogTitle className="text-pink-500 text-center font-bold text-2xl">
                        You ran out of hearts!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Purchase some in the store
                    </DialogDescription>
                    <DialogFooter className="mb-4">
                        <div className="flex flex-col gap-y-4 w-full">
                            <Button variant="primary" className="w-full" size="lg" onClick={() => {
                                close();
                                router.push("/learn");
                            }}>
                                End session
                            </Button>
                        </div>

                    </DialogFooter>
                </DialogHeader>
            </DialogContent>

        </Dialog>
    )

};