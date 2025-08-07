import { HumanMessage } from "@langchain/core/messages";
import { model, search } from "./model";

async function simpleAgent(query: string) {
  console.log(`User query: ${query}`);

  // First, search for information
  console.log("Searching for information...");
  try {
    const searchResults = await search.invoke(query);
    console.log(`Search results: ${searchResults}`);

    // Now ask the LLM to summarize and answer based on the search results
    console.log("Asking LLM to analyze the search results...");
    const prompt = `Based on the following search results, please provide a comprehensive answer to the question: "${query}"

Search results:
${searchResults}

Please provide a clear, accurate answer based on this information:`;

    const response = await model.invoke([new HumanMessage(prompt)]);
    console.log("Final answer:");
    console.log(response.content);
    return response.content;
  } catch (error) {
    console.error("Error during search:", error);
    // Fallback to asking LLM directly
    console.log("Fallback: Asking LLM directly...");
    const response = await model.invoke([new HumanMessage(query)]);
    console.log("Direct LLM answer:");
    console.log(response.content);
    return response.content;
  }
}

async function main() {
  await simpleAgent("Who won the 2022 Stanley Cup?");
}

main().catch(console.error);
