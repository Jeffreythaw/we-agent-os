# Provider System

The Provider System is responsible for abstracting the underlying Language Models away from the core Agent logic. 

## Supported Providers
The framework supports a mixed routing ecosystem:
- **OpenAI**: Primary high-capacity models (e.g., GPT-4o).
- **OpenRouter**: Aggregator for accessing various models via a single API.
- **Gemini**: Google's models, optimized for large context windows.
- **Claude (Anthropic)**: High-reasoning models (e.g., Claude 3.5 Sonnet).
- **Ollama**: Local, privacy-first inference for smaller models (e.g., Llama 3).
- **LM Studio**: Alternative local inference backend via OpenAI-compatible endpoints.

## Abstraction Interface
All providers must implement a unified `LLMProvider` interface handling:
1. `generateText`: Standard text completion.
2. `generateStructured`: JSON/Zod validated object generation.
3. `stream`: Server-sent events for real-time text output.
4. `toolCall`: Standardized mapping of OS Device Drivers into the provider's specific tool-calling syntax.

## Router Logic
The Kernel uses a `ProviderRouter` to route tasks based on:
- **Cost**: Routing simple tasks to local models (Ollama).
- **Capability**: Routing complex coding tasks to Claude/OpenAI.
- **Context Size**: Routing large document analysis to Gemini.
