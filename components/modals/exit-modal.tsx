"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useExitModal } from "@/app/store/use-exit-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

export const ExitModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close} = useExitModal();

    useEffect(() => setIsClient(true), []);

    if(!isClient){
        return null;
    }
    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/sad_images.svg" alt="Mascot" height={80} width={80}/>
                    
                    </div>
                    <DialogTitle className="text-pink-500 text-center font-bold text-2xl">
                        Wait, don&apos;t exit!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        You&apos;re about to leave the lesson. Are you sure? 
                    </DialogDescription>
                    <DialogFooter className="mb-4">
                        <div className="flex flex-col gap-y-4 w-full">
                            <Button variant="primary" className="w-full" size="lg" onClick={close}>
                                Keep learning
                            </Button>
                            <Button variant="dangerOutline" className="w-full" size="lg" onClick={() => {
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