// https://js.langchain.com/docs/tutorials/chatbot/

// continue from here: https://js.langchain.com/docs/tutorials/chatbot/#managing-conversation-history

import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
  Annotation,
} from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";
import { model } from "../model.ts";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const config = { configurable: { thread_id: uuidv4() } };

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
    const prompt = await promptTemplate.invoke(state);
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

const output = await app.invoke(
  {
    messages: {
      role: "user",
      content: "Hi! I'm Bob.",
    },
    language: "english",
  },
  config
);
console.log("Output 1:");
console.log(output.messages[output.messages.length - 1].content);

const output2 = await app.invoke(
  {
    messages: {
      role: "user",
      content: "What's my name?",
    },
    language: "french",
  },
  config
);
console.log("Output 2:");
console.log(output2.messages[output2.messages.length - 1].content);

console.log("all messages:");
console.log(output2.messages.map((m) => `>>> ${m.content}`));

// Add memory
