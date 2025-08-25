import { ChatOllama } from "@langchain/ollama";
// import { ChatOpenAI } from "@langchain/openai";

// Shared Ollama LLM configuration
export const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "gpt-oss:20b",
  // temperature: 0.7,
});
