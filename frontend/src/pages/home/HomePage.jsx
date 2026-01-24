import HeroSection from "./HeroSection";
import HomeProjectSection from "@/features/projects/sections/HomeProjectSection";
import ServicesSection from "./ServicesSection";
import SkillsSection from "./SkillsSection";
import FinalCTA from "./FinalCTA";
import useProjects from "@/features/projects/hooks/useProjects";

const HomePage = () => {
  const { projects, loading } = useProjects();
  return (
    <>
      <HeroSection />
      <HomeProjectSection projects={projects} />
      <ServicesSection />
      <SkillsSection />
      <FinalCTA />
    </>
  );
};

export default HomePage;
