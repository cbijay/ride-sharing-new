import AppHeader from "core/components/layout/AppHeader";
import AppSidebar from "core/components/layout/AppSidebar";

import { TAppLayout } from "core/types/layouts/TAppLayout";

const AppLayout = ({ children }: TAppLayout) => {
  return (
    <div className="flex h-full">
      <AppSidebar />

      <div className="lg:max-w-[calc(100%-195px)] w-full pt-8 px-6 pb-2 overflow-auto">
        <AppHeader />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
