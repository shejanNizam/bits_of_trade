import ActuallyDoes from "@/components/home/ActuallyDoes";
import Banner from "@/components/home/Banner";
import Capabilities from "@/components/home/Capabilities";
import DisciplineFails from "@/components/home/DisciplineFails";
import HowWorks from "@/components/home/HowWorks";

export default function Home() {
  return (
    <>
      <Banner />
      <DisciplineFails />
      <ActuallyDoes />
      <HowWorks />
      <Capabilities />
    </>
  );
}
