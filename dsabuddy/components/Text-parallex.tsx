'use client'

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Dashboard from '@/public/dashboard-white.png'
import Tracker from '@/public/track.png'
import Track from '@/public/tracker.png'

export interface TextInterface {
    imgUrl?: any;
    subheading?: string;
    heading?: string;
    children?: React.ReactNode;
    description?: string;


}
export const TextParallax = () => {
  return (
    <div className="bg-[#0A0A0A]">
      <TextParallaxContent
        imgUrl={Dashboard}
        subheading="Personalized"
        heading="Progress Tracking"
      >
        <Content heading="Visualize Your Journey"
         description="Track your completed questions, 
         monitor performance, and see your improvement 
         over time with dashboard. 
         Our dashboard provides insights into your 
         strengths and areas for improvement." />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl={Tracker}
        subheading="Intelligent"
        heading="Question Recommendations"
      >
        <Content
        heading="AI-Powered Suggestions"
        description="Get tailored question recommendations based 
        on your skill level and progress, ensuring efficient and effective practice.
        Never waste time wondering what to practice next!" />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl={Track}
        subheading="Comprehensive"
        heading="DSA Sheets and Roadmaps"
      >
        <Content
        heading="Detailed-Curated Resources"
        description="Access structured DSA sheets and roadmaps to guide your 
        preparation, covering all essential topics for interviews and exams.
        Follow our roadmaps to cover all topics 
        and ensure thorough preparation." />
      </TextParallaxContent>
     
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent: React.FC<TextInterface> = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage: React.FC<TextInterface> = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  console.log(imgUrl);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl?.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy: React.FC<TextInterface> = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const Content: React.FC<TextInterface> = ({heading, description }) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      {heading}
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        {description}
      </p>
     
      <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Learn more <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);