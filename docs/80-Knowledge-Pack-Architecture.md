# Knowledge Pack Architecture

The Knowledge Pack is the foundational unit of domain intelligence in the WE Agent OS. It separates "what we know" (business logic) from "how we execute" (OS engines). 

## 1. Knowledge Pack Structure
Knowledge Packs are organized as modular file structures, easily version controlled and deployable independent of the OS kernel.
```text
knowledge-packs/
└── we-core-standards/
    ├── pack.json
    ├── catalogs/
    │   ├── questions.json
    │   └── requirements.json
    ├── decisions/
    │   └── matrix.json
    ├── rules/
    │   └── validation.rules.json
    ├── templates/
    │   └── standard.md
    └── references/
        └── guidelines.md
```

## 2. Metadata (`pack.json`)
The entry point. Declares the pack's identity and capabilities.
- **Fields**: `id`, `name`, `version`, `author`, `description`.
- **Purpose**: Allows the OS to index available packs in memory.

## 3. Question Catalog (`catalogs/questions.json`)
Consumed dynamically by the **Question Engine**.
- **Format**: JSON array mapping missing requirement variables to human-readable prompts.
- **Example**: `{"triggerOnMissing": "databaseType", "question": "What database technology should be used?"}`

## 4. Requirement Catalog (`catalogs/requirements.json`)
Consumed by the **Requirement Analyzer**.
- **Format**: Taxonomy mapping required facts to Requirement Categories (Functional, Technical, Design).
- **Purpose**: Defines the bounds of what the OS must discover before a project achieves the Definition of Ready (DoR).

## 5. Decision Matrix (`decisions/matrix.json`)
Consumed by the **Policy Engine / Approval Gate**.
- **Format**: Tabular rules mapping multidimensional inputs to deterministic outputs.
- **Example**: `IF equipmentType == 'HVAC' AND reportType == 'FAULT', THEN approvalRequired = true`.

## 6. Rules (`rules/validation.rules.json`)
Consumed by the **Rule Engine** and **Checklist Engine**.
- **Format**: Arrays of boolean assertion objects (`factKey`, `operator`, `expectedValue`, `severity`).
- **Purpose**: Ensures that all inbound facts adhere to physical and operational constraints before workflow progression.

## 7. Templates (`templates/*.md`)
Consumed by the **Template Engine** (and eventually the **Project Bootstrap Workflow**).
- **Format**: Markdown files containing `{{variable}}` syntax.
- **Purpose**: Provides the static scaffolding for generating artifacts like `PROJECT_SPEC.md` or `REQUIREMENTS.md`.

## 8. References (`references/*.md`)
Consumed by the **Discovery Engine** and future AI Subagents.
- **Format**: Free-text Markdown documents detailing company standards, API docs, or style guides.
- **Purpose**: Injected dynamically into LLM context windows to augment prompt generation without hallucination.

## 9. Versioning
Knowledge Packs strictly follow Semantic Versioning (SemVer) (`major.minor.patch`). 
- Workflows explicitly declare compatible pack versions.
- The OS guarantees that updating a pack's major version will not spontaneously break legacy execution loops.

## 10. Dependency Model
Knowledge Packs are composable. A pack can declare dependencies on other packs inside its `pack.json` (e.g., `we-react-app-v1` depends on `we-node-backend-v1`).
- The OS handles runtime merging.
- Rules and templates are cascaded sequentially, allowing child packs to inherit or override core company standards smoothly.
