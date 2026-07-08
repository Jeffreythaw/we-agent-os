# Requirement Completion Rules

These deterministic OS rules enforce logical consistency within the Requirement Categories before DoR can be achieved.

## Example Rules (RuleEngine)

1. **rule_tech_stack_defined**
   - Evaluates the `Technical` category.
   - Asserts that at minimum a Language and Framework are defined.
   
2. **rule_ui_requires_design**
   - If `Functional` category includes "Frontend/UI", asserts that the `Design` category is not empty.
   
3. **rule_database_schema_present**
   - If `Technical` category includes a Database, asserts that a basic data model fact exists in the `Functional` category.

Violations of these rules trigger the Question Engine to resolve the contradiction.
