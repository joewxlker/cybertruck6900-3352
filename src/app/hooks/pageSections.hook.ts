"use client";

import { useEffect, useState } from "react";

interface SectionData {
  href: string;
  title: string;
}

export const useSectionElements = () => {
  const [sections, setSections] = useState<SectionData[] | null>(null);
  useEffect(() => {
    const elements = document.querySelectorAll("section");
    const sectionData: SectionData[] = [];
    elements.forEach((element) => {
      sectionData.push({
        href: `#${element.id}`,
        title: `${element.id[0]?.toUpperCase()}${element.id.slice(1)}`,
      });
    });
    setSections(sectionData);
  }, []);
  return sections;
};
