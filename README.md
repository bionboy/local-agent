# Local TypeScript AI Agent

A local AI agent built with TypeScript, using Ollama (GPT-OSS 20B model), LangChain.js, and web search capabilities.

## Features

- 🤖 **Local LLM**: Uses GPT-OSS 20B model running locally via Ollama
- 🔍 **Web Search**: Integrates DuckDuckGo search for current information
- 🛡️ **Fallback System**: Falls back to direct LLM queries if search fails
- 🎯 **Multiple Modes**: Simple one-shot and interactive chat modes

## Prerequisites

1. **Ollama installed and running**

   ```bash
   # Install Ollama (if not already installed)
   # Then pull the model:
   ollama pull gpt-oss:20b
   ```

2. **Node.js and pnpm**
   ```bash
   # Make sure pnpm is installed
   npm install -g pnpm
   ```

## Installation

```bash
# Clone/navigate to the project directory
cd local-agent

# Install dependencies
pnpm install
```

## Usage

### Simple Mode (One Question)

```bash
pnpm start
# Runs simple-agent.ts with a predefined question
```

### Interactive Mode (Chat)

```bash
pnpm run interactive
# Starts an interactive chat session
```

### Original Agent (LangChain Agent Framework)

```bash
pnpm run agent
# Note: This may have parsing issues with the current model
```

## Files

- `simple-agent.ts` - Basic agent with search + LLM fallback
- `interactive-agent.ts` - Interactive chat version
- `agent.ts` - Original LangChain agent implementation
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts

## How It Works

1. **User Input**: Accepts a question or query
2. **Web Search**: Attempts to search DuckDuckGo for current information
3. **LLM Processing**: Uses the local GPT-OSS 20B model to analyze search results
4. **Fallback**: If search fails (rate limiting, etc.), queries the LLM directly
5. **Response**: Returns a comprehensive answer

## Architecture

```
User Query → DuckDuckGo Search → GPT-OSS 20B (via Ollama) → Response
                ↓ (on failure)
            Direct GPT-OSS 20B → Response
```

## Example Output

```
🤔 User query: Who won the 2022 Stanley Cup?
🔍 Searching for information...
❌ Search failed (likely rate limited), using direct LLM...
✅ Direct LLM answer:
The Colorado Avalanche won the 2022 Stanley Cup, defeating the Tampa Bay Lightning in six games.
```

## Dependencies

- **LangChain.js**: Framework for building LLM applications
- **Ollama Integration**: Local model inference
- **DuckDuckGo Search**: Web search capabilities
- **TypeScript**: Type-safe development

## Troubleshooting

- **Ollama not running**: Make sure `ollama serve` is running
- **Model not found**: Run `ollama pull gpt-oss:20b`
- **Search rate limits**: The agent will fall back to direct LLM queries
- **Memory issues**: The 20B model requires significant RAM
