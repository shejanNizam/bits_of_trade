"use client";

import {
  useGetAllAnalyticsQuery,
  useGetAllMistakeQuery,
} from "@/redux/features/mistake/mistakeApi";
import { Spin } from "antd";
import MistakeFrequency from "../components/system/mistakes/MistakeFrequency";
import MistakeImpact from "../components/system/mistakes/MistakeImpact";
import MistakeOverview from "../components/system/mistakes/MistakeOverview";
import SeverityDistribution from "../components/system/mistakes/SeverityDistribution";

export default function MistakesPage() {
  const { data, isLoading, error, refetch } = useGetAllMistakeQuery({
    page: 1,
    limit: 100,
  });

  const { data: analyticsData, isLoading: isAnalyticsLoading } =
    useGetAllAnalyticsQuery({});

  console.log(analyticsData, isAnalyticsLoading);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load mistakes. Please try again.
      </div>
    );
  }

  const mistakes = data?.results || [];

  return (
    <div className="space-y-4">
      <MistakeOverview mistakes={mistakes} refetch={refetch} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <MistakeFrequency
        // analyticsData={analyticsData}
        // isAnalyticsLoading={isAnalyticsLoading}
        />
        <MistakeImpact
        // analyticsData={analyticsData}
        // isAnalyticsLoading={isAnalyticsLoading}
        />
      </div>

      <SeverityDistribution
      // analyticsData={analyticsData}
      // isAnalyticsLoading={isAnalyticsLoading}
      />
    </div>
  );
}
