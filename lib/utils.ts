import { BaseMessage } from "@langchain/core/messages";
import type { BinaryOperatorAggregate, Messages, StateType } from "@langchain/langgraph";

type StateWithMessages = StateType<{ messages: BinaryOperatorAggregate<BaseMessage[], Messages> }>;

export function lastMessage(state: StateWithMessages) {
  return state.messages[state.messages.length - 1].content;
}
