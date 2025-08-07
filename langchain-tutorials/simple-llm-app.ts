// https://js.langchain.com/docs/tutorials/llm_chain/

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { model } from "../model.ts";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const systemTemplate = "Translate the following from English into {language}";
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);

async function main() {
  let prompt;
  prompt = [
    // new SystemMessage("Translate the following from English into Italian"),
    new HumanMessage("hi! what is up dude?"),
  ];
  prompt = await promptTemplate.invoke({
    language: "french",
    text: "hi! what is up?",
  });

  (await model.stream(prompt)).pipeTo(
    new WritableStream({
      write(chunk) {
        process.stdout.write(chunk.content.toString());
      },
    })
  );
}

main();
