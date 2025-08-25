// https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { model } from "../lib/model.ts";
import { searchTavily } from "../lib/tools.ts";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { lastMessage } from "../lib/utils.ts";

// Initialize memory to persist state between graph runs
const agentCheckpointer = new MemorySaver();
const agent = createReactAgent({
  llm: model,
  tools: [searchTavily],
  checkpointSaver: agentCheckpointer,
});

console.log("Starting agent...");

// Now it's time to use!
const agentFinalState = await agent.invoke(
  { messages: [new HumanMessage("what is the current weather in sf")] },
  { configurable: { thread_id: "42" } }
);

console.log(lastMessage(agentFinalState));

const agentNextState = await agent.invoke(
  { messages: [new HumanMessage("what about ny")] },
  { configurable: { thread_id: "42" } }
);

console.log(lastMessage(agentNextState));
