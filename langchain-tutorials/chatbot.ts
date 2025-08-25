// https://js.langchain.com/docs/tutorials/chatbot/

import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
  Annotation,
} from "@langchain/langgraph";
import { HumanMessage, trimMessages } from "@langchain/core/messages";
import { v4 as uuidv4 } from "uuid";
import { model } from "../lib/model.ts";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const config = { configurable: { thread_id: uuidv4() } };

const trimmer = trimMessages({
  maxTokens: 10,
  strategy: "last",
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: "human",
});

const createApp = () => {
  const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful assistant. Answer all questions to the best of your ability in {language}.",
    ],
    ["placeholder", "{messages}"],
  ]);

  const GraphAnnotation = Annotation.Root({
    ...MessagesAnnotation.spec,
    language: Annotation<string>(),
  });

  const callModel = async (state: typeof GraphAnnotation.State) => {
    // Trim messages to manage/reduce context window size
    const trimmedMessages = await trimmer.invoke(state.messages);

    const prompt = await promptTemplate.invoke({
      messages: trimmedMessages,
      language: state.language,
    });
    const response = await model.invoke(prompt);
    // Update message history with response:
    return { messages: [response] };
  };

  // Define a new graph
  const workflow = new StateGraph(GraphAnnotation)
    // Define the node and edge
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

  return workflow.compile({ checkpointer: new MemorySaver() });
};

const app = createApp();

await app.invoke(
  {
    messages: [new HumanMessage("Hi! I'm Bob.")],
    language: "english",
  },
  config
);

await app.invoke(
  {
    messages: [new HumanMessage("What's my name?")],
    language: "french",
  },
  config
);

const output3 = await app.invoke(
  {
    messages: [new HumanMessage("What's my name?")],
    language: "english",
  },
  config
);

console.log("all messages:");
console.log(output3.messages.map((m) => `>>> ${m.content}`));
