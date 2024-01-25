import DashboardContainer from "@/components/dashboard-container";
import { register } from 'swiper/element/bundle';

export default async function Home() {
  register();

  return (
    <div className="bg-neutral-900 flex-1">
      <div className="flex justify-center items-center">
        <DashboardContainer />
      </div>
    </div>
  );
}
