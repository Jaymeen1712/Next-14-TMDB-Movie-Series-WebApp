import DashboardContainer from "@/components/dashboard-container";
import { register } from "swiper/element/bundle";

export default async function Home() {
  register();

  return (
    <div className="flex-1 bg-neutral-900">
      <div className="flex min-h-[calc(100vh-90px)] items-center justify-center px-4 py-8">
        <DashboardContainer />
      </div>
    </div>
  );
}
