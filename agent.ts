import { AgentExecutor, createStructuredChatAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { model, search } from "./model";

async function main() {
  // Create the prompt template
  const prompt = ChatPromptTemplate.fromTemplate(`
You are a helpful AI assistant. You have access to the following tools:

{tools}

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Question: {input}
Thought: {agent_scratchpad}
`);

  // Create the agent
  const agent = await createStructuredChatAgent({
    llm: model,
    tools: [search],
    prompt,
  });

  // Create the executor
  const agentExecutor = new AgentExecutor({
    agent,
    tools: [search],
    verbose: true,
  });

  const result = await agentExecutor.invoke({
    input: "Who won the 2022 Stanley Cup?",
  });
  console.log(result.output);
}

main();
