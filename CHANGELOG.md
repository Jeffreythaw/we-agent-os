# Changelog

All notable changes to this project will be documented in this file.

## [v0.1.0-alpha] - 2026-07-09

### Added
- **Kernel Runtime**: Implemented the core orchestrator, EventBus, StateMachine, and AuditLogger.
- **Workflow Runner**: Added a JSON-driven workflow engine and workflow loader.
- **Skill Registry**: Created a decentralized `ISkill` interface and registry.
- **System Skills**: Wrapped deterministic engines into `system.rule_check`, `system.checklist_check`, and `system.template_render` skills.
- **CLI Commands**: Created the HarbourLink Service Report Agent CLI (`we-agent service-report generate`).
- **Reasoning Framework**: Added the Reasoning pack loader and Consensus Service.
- **Six Hats**: Implemented De Bono's Six Hats as a purely deterministic reasoning pack.
- **Test Suite**: Achieved 100% pass rate with 76 tests passing across 28 suites.

### Changed
- Shifted the architecture from "Agent-First" to "Workflow-First, AI-Optional" to prioritize mathematical safety.
- Migrated domain logic out of internal engines and into decoupled JSON Knowledge Packs.

### Fixed
- N/A (Initial Release)

### Known Limitations
- **Offline-Only**: The OS is strictly bounded to deterministic, offline execution.
- **No LLMs**: There is no LLM or provider integration yet (no OpenAI, no Ollama).
- **No I/O Tools**: There are no tools available for parsing PDF, Word, or email files, nor any database connectivity tools yet.
