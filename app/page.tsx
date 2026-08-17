import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HariIni } from "@/components/sections/hari-ini";
import { YangSedangDibangun } from "@/components/sections/yang-sedang-dibangun";
import { Perjalanan } from "@/components/sections/perjalanan";
import { CaraBekerja } from "@/components/sections/cara-bekerja";
import { ProjectFavorit } from "@/components/sections/project-favorit";
import { Catatan } from "@/components/sections/catatan";
import { Rencana } from "@/components/sections/rencana";
import { MariBerbincang } from "@/components/sections/mari-berbincang";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <HariIni />
        <YangSedangDibangun />
        <Perjalanan />
        <CaraBekerja />
        <ProjectFavorit />
        <Catatan />
        <Rencana />
        <MariBerbincang />
      </main>
      <Footer />
    </>
  );
}
