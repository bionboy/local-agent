import { ChatOllama } from "@langchain/ollama";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";

// Shared Ollama LLM configuration
export const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "gpt-oss:20b",
  // temperature: 0.7,
});

// Shared search tool
export const search = new DuckDuckGoSearch();
