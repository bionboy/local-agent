import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { model } from "./model.ts";

async function main() {
  const messages = [
    new SystemMessage("Translate the following from English into Italian"),
    new HumanMessage("hi!"),
  ];

  const x = await model.invoke(messages);
  console.log(x);
}

main();
