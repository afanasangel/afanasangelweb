"use client";

import { useState } from "react";

interface ProductTabsProps {
  description: string;
  descriptionHtml?: string;
  detail?: string;
  fabric?: string;
  color?: string;
}

export default function ProductTabs({
  description,
  descriptionHtml,
  detail,
  fabric,
  color,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "description">("details");

  return (
    <div className="mt-8">
      {/* Tab Buttons */}
      <div className="border-t border-gray-300 pt-6 flex items-center gap-8 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("details")}
          className={`text-xs tracking-widest uppercase pb-2 transition-all cursor-pointer font-semibold ${
            activeTab === "details"
              ? "text-black border-b-[3px] border-black"
              : "text-gray-500 hover:text-black border-b-[3px] border-transparent"
          }`}
        >
          DETAILS
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("description")}
          className={`text-xs tracking-widest uppercase pb-2 transition-all cursor-pointer font-semibold ${
            activeTab === "description"
              ? "text-black border-b-[3px] border-black"
              : "text-gray-500 hover:text-black border-b-[3px] border-transparent"
          }`}
        >
          DESCRIPTION
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "details" ? (
        <div className="text-xs text-black space-y-4 leading-relaxed font-medium">
          {detail && (
            <p>
              <strong>Product Detail:</strong>
              <br />
              {detail}
            </p>
          )}
          {fabric && (
            <p>
              <strong>Fabric:</strong> {fabric}
            </p>
          )}
          {color && (
            <p>
              <strong>Color:</strong> {color}
            </p>
          )}
          <p>
            <strong>Note:</strong>
            <br />
            Product color may slightly vary due to photographic lighting sources or your device settings.
          </p>
        </div>
      ) : (
        <div className="text-xs text-gray-800 space-y-3 leading-relaxed font-normal">
          {descriptionHtml ? (
            <div
              className="prose prose-sm max-w-none text-xs text-black leading-relaxed"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ) : (
            <p className="whitespace-pre-line">{description || "No description provided."}</p>
          )}
        </div>
      )}
    </div>
  );
}
