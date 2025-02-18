"use client";

import { useSearchText } from "@/contexts/search-text";
import Fuse from "fuse.js";

import { homeTools } from "@/config/tools";
import { PageRootSection } from "@/components/page-root-section";
import { ToolCards } from "@/components/tool-cards";

export default function Page() {
  // use search params in context
  const q = useSearchText();

  const fuse = new Fuse(homeTools, { keys: ["keywords"], threshold: 0.45 });
  const keyWordsOptions = q.split(" ").map(word => ({ keywords: word }));
  const result = fuse.search({ $or: keyWordsOptions });
  const tools = result.map(({ item }) => item);

  const [title, child] =
    tools.length === 0
      ? ["No results found", null]
      : [`Search results for "${q}"`, <ToolCards {...{ tools }} />];

  return <PageRootSection {...{ title }}>{child}</PageRootSection>;
}
