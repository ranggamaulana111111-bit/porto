import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { ProfileSnapshot } from "@/components/sections/profile-snapshot";
import { TentangSaya } from "@/components/sections/tentang-saya";
import { WhatImLearning } from "@/components/sections/what-im-learning";
import { SelectedProjects } from "@/components/sections/selected-projects";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { TechnicalStack } from "@/components/sections/technical-stack";
import { CurrentlyLearning } from "@/components/sections/currently-learning";
import { WorkspaceTeaser } from "@/components/sections/workspace-teaser";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <ProfileSnapshot />
        <TentangSaya />
        <WhatImLearning />
        <SelectedProjects />
        <Experience />
        <Education />
        <TechnicalStack />
        <CurrentlyLearning />
        <WorkspaceTeaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
