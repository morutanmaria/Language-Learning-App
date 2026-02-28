"use client"
import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    hearts: number;
    points: number;
};

export const Items = ({hearts, points}: Props) => {
    const [pending, startTransition] = useTransition();
    const onRefillHearts = () => {
        if(pending || hearts === 5 || points < 50){
            return;
        }
        startTransition(() => {
            refillHearts().catch(() => toast.error("Something went wrong, try again"));
        });
    };
    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image src="hearts.svg" alt="Heart" height={60} width={60}/>
                <div className="flex-1">
                    <p className="text-pink-600 text-xl lg:text-2xl font-bold"> 
                        Refill hearts
                    </p>
                </div>
                <Button onClick={onRefillHearts} disabled={pending || hearts === 5 || points < 50}>
                    {hearts === 5 ? "full" : (
                        <div className="flex items-center">
                            <Image src="/points.svg" alt="Points" height={20} width={20}/>
                            <p>
                                50
                            </p>
                        </div>
                    )}
                </Button>

            </div>
        </ul>
    );
};