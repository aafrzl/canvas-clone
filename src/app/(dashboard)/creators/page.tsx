import { protectPage } from "@/app/features/auth/utils";
import BannerCreators from "./_components/banner-creators";
import CreateTemplateModal from "./_components/create-template-modal";
import TemplatesUserSection from "./_components/templates-user-section";

export default async function CreatorsPage() {
  await protectPage();

  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto py-8">
      <BannerCreators />
      <CreateTemplateModal />
      <TemplatesUserSection />
    </div>
  );
}
