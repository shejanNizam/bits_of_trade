import ActuallyDoes from "@/components/home/ActuallyDoes";
import Banner from "@/components/home/Banner";
import BuildingDiscipline from "@/components/home/BuildingDiscipline";
import Capabilities from "@/components/home/Capabilities";
import DifferentHow from "@/components/home/DifferentHow";
import DisciplineFails from "@/components/home/DisciplineFails";
import Faqs from "@/components/home/Faqs";
import HomeDisciplineSystem from "@/components/home/homeDisciplineSystem/HomeDisciplineSystem";
import NotAnotherTradingTools from "@/components/home/homeDisciplineSystem/NotAnotherTradingTools";
import TradersReview from "@/components/home/TradersReview";
import Pricing from "./pricing/page";

export default function Home() {
  return (
    <>
      <Banner />
      <DisciplineFails />
      <ActuallyDoes />
      <Capabilities />
      <NotAnotherTradingTools />
      <HomeDisciplineSystem />
      <TradersReview />
      <Pricing />
      <DifferentHow />
      <BuildingDiscipline />
      <Faqs />
    </>
  );
}
