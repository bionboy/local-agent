import { HumanMessage } from "@langchain/core/messages";
import * as readline from "readline";
import { model, search } from "./model";

async function simpleAgent(query: string) {
  console.log(`User query: ${query}`);

  // First, search for information
  console.log("Searching for information...");
  try {
    const searchResults = await search.invoke(query);
    console.log(`Search results found`);

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
    console.error("Search failed (likely rate limited), using direct LLM...");
    // Fallback to asking LLM directly
    const response = await model.invoke([new HumanMessage(query)]);
    console.log("Direct LLM answer:");
    console.log(response.content);
    return response.content;
  }
}

async function main() {
  console.log("Local AI Agent is ready!");
  console.log("Using GPT-OSS 20B model via Ollama with web search capabilities");
  console.log("Type your questions or 'quit' to exit\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const question = await new Promise<string>((resolve) => {
      rl.question("Ask me anything: ", (answer) => {
        resolve(answer);
      });
    });

    if (question.toLowerCase() === "quit" || question.toLowerCase() === "exit") {
      console.log("Goodbye!");
      break;
    }

    if (question.trim()) {
      console.log("\n" + "=".repeat(50));
      await simpleAgent(question);
      console.log("=".repeat(50) + "\n");
    }
  }

  rl.close();
}

main().catch(console.error);
