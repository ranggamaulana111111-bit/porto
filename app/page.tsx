import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Currently } from "@/components/sections/currently";
import { TentangSaya } from "@/components/sections/tentang-saya";
import { SelectedProjects } from "@/components/sections/selected-projects";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { TechnicalStack } from "@/components/sections/technical-stack";
import { WhatImLearning } from "@/components/sections/what-im-learning";
import { OutsideWork } from "@/components/sections/outside-work";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { WorkspaceTeaser } from "@/components/sections/workspace-teaser";
import { AnonymousMessages } from "@/components/sections/anonymous-messages";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <Currently />
        <TentangSaya />
        <SelectedProjects />
        <Experience />
        <Education />
        <TechnicalStack />
        <WhatImLearning />
        <OutsideWork />
        <JournalTeaser />
        <WorkspaceTeaser />
        <AnonymousMessages />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
