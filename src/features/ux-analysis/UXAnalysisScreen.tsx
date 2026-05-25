import { useState } from "react";

import { UXAnalysisHeader } from "./components/UXAnalysisHeader";
import { WebsiteAnalyzerPanel } from "./components/WebsiteAnalyzerPanel";
import { UXScoreOverview } from "./components/UXScoreOverview";
import { UXFindingsFeed } from "./components/UXFindingsFeed";
import { UXRecommendations } from "./components/UXRecommendations";

export function UXAnalysisScreen() {
  const [selectedIssue, setSelectedIssue] = useState(null);

  return (
    <div className="space-y-6">
      <UXAnalysisHeader />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <WebsiteAnalyzerPanel
            selectedIssue={selectedIssue}
            onSelectIssue={setSelectedIssue}
          />
        </div>

        <div className="col-span-4">
          <UXScoreOverview />
        </div>
      </div>

      <UXFindingsFeed
        selectedIssue={selectedIssue}
        onSelectIssue={setSelectedIssue}
      />

      <UXRecommendations />
    </div>
  );
}