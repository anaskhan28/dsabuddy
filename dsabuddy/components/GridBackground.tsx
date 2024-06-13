"use client";

import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { Button } from "./ui/button";
import ShimmerButton from "./ui/shimmer-button";
import { HeroScroll } from "./ScrollCard";
export const Hero = () => {
  return (
    <>
    <div className="relative flex flex-col min-h-[90vh] w-full items-center justify-center overflow-hidden bg-background ">
        
        <ShimmerButton  className="shadow-2xl z-20 -mt-30">
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-sm">
          Exciting Announcemnt 🎉
        </span>
      </ShimmerButton>
      <p className="z-10 mt-10 mb-6 whitespace-pre-wrap md:max-w-3xl max-w-lg text-center md:text-6xl text-3xl font-extrabold tracking-wider  text-white">
      Track Your DSA Journey in with us </p>
      <AnimatedGridPattern
        numSquares={90}
        maxOpacity={0.5}
        duration={2}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />

<p className=" max-w-md text-center text-base
 leading-relaxed text-[#D4D4D4] 
 sm:text-lg md:text-lg md:leading-relaxed">
Track, maintain, and streamline every aspect
of your DSA with DSABuddy </p>

<div className="flex gap-8 justify-center items-center mt-8">
<button className=" animate-buttonheartbeat rounded-md bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-6 py-2 text-sm font-semibold text-white">
        Get Started
      </button>
    <Button variant="outline" className="px-6 py-2">Learn More</Button>
</div>
    </div>

    <HeroScroll/>
    </>
  );
};

