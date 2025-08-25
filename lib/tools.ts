import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
import { TavilySearch } from "@langchain/tavily";

// Shared search tool
export const searchDuckDuckGo = new DuckDuckGoSearch();

export const searchTavily = new TavilySearch({ maxResults: 3 });
