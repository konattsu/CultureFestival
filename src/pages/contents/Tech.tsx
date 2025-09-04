import React from "react";

import ContentPageLayout from "../../components/ContentPageLayout";

const Tech: React.FC = () => {
  return (
    <ContentPageLayout title="Pyxis-CodeCanvas">
      <div className="mt-8 h-screen">
        <iframe
          src="https://pyxis-code.onrender.com/"
          className="h-full w-full rounded-lg border"
          title="Pyxis Code"
        />
      </div>
      <p className="mt-4 text-center text-gray-500">
        created by Roughfts/Stasshe
      </p>
    </ContentPageLayout>
  );
};

export default Tech;
