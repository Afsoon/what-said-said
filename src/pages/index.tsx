import { HomeHero } from "@/components/home_hero";

export default async function HomePage() {
  return <HomeHero />;
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
