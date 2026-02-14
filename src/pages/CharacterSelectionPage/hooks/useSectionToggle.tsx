import { useState } from "react";

const useSectionToggle = (initial: Record<string, boolean>) => {
  const [openSections, setOpenSections] = useState(initial);

  const open = (section: string) => {
    setOpenSections((prev) => {
      const next = Object.fromEntries(
        Object.keys(prev).map((key) => [key, key === section])
      );
      return next;
    });
  };

  const toggle = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return { openSections, open, toggle };
};

export default useSectionToggle;
