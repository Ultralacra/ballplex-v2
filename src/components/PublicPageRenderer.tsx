"use client";

import DynamicSection from "@/components/admin/DynamicSection";
import type { PageSection } from "@/lib/types/sections";

export default function PublicPageRenderer({
  sections,
}: {
  sections: PageSection[];
}) {
  return (
    <>
      {sections
        .filter((section) => section.is_visible)
        .sort((a, b) => a.order_index - b.order_index)
        .map((section) => (
          <DynamicSection
            key={section.id}
            type={section.type as never}
            props={section.props as never}
          />
        ))}
    </>
  );
}
