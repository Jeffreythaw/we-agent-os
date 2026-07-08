#!/usr/bin/env node
import { Command } from 'commander';
import { Kernel } from '../kernel/kernel.js';

const program = new Command();

program
  .name('we-agent')
  .description('WE Agent OS CLI')
  .version('0.1.0-alpha');

program
  .command('run')
  .description('Run a request through WE Agent OS')
  .argument('<request>', 'The text request to execute')
  .action(async (request: string) => {
    console.log('WE Agent OS');
    const kernel = new Kernel();
    await kernel.initialize();
    const result = await kernel.execute({ text: request });
    console.log(`Provider: ${result.providerName}`);
    console.log(`Estimated Tokens: ${result.estimatedTokens}`);
    console.log(`Output: ${result.outputText}`);
  });

const workflowCmd = program.command('workflow').description('Workflow management');

workflowCmd
  .command('run <workflowFile>')
  .description('Run a specific workflow JSON file')
  .option('-i, --input <inputFile>', 'Input JSON file containing facts and variables')
  .option('-o, --output <outputFile>', 'Output file to save generated artifact')
  .action(async (workflowFile: string, options: { input?: string, output?: string }) => {
    const { WorkflowLoader } = await import('../workflows/workflow-loader.js');
    const loader = new WorkflowLoader();
    const input = await loader.load(workflowFile, options.input);

    const kernel = new Kernel();
    await kernel.initialize();
    
    const result = await kernel.executeWorkflow(input);

    if (result.passed) {
      console.log('\n--- WORKFLOW PASSED ---\n');
      for (const artifact of result.artifacts) {
        console.log(`Artifact from Step: ${artifact.stepId}\n`);
        console.log(artifact.content);
        console.log('\n-----------------------\n');
        
        if (options.output) {
          const fs = await import('node:fs/promises');
          await fs.writeFile(options.output, artifact.content, 'utf-8');
          console.log(`Artifact saved to ${options.output}`);
        }
      }
    } else {
      console.error('\n--- WORKFLOW FAILED ---\n');
      for (const err of result.errors) {
        console.error(`Error in Step ${err.stepId} [${err.code}]: ${err.message}`);
      }
      for (const warn of result.warnings) {
        console.warn(`Warning: ${warn}`);
      }
      process.exit(1);
    }
  });

const serviceReportCmd = program.command('service-report').description('Service Report Agent commands');

serviceReportCmd
  .command('generate')
  .description('Generate a service report from input JSON')
  .requiredOption('-i, --input <inputFile>', 'Input JSON file containing facts and variables')
  .requiredOption('-o, --output <outputFile>', 'Output file to save generated artifact')
  .action(async (options: { input: string, output: string }) => {
    const { WorkflowLoader } = await import('../workflows/workflow-loader.js');
    const path = await import('node:path');
    const fs = await import('node:fs/promises');
    
    const workflowPath = path.join(process.cwd(), 'workflows/service-report/harbourlink-routine-service.workflow.json');

    const loader = new WorkflowLoader();
    let input;
    try {
      input = await loader.load(workflowPath, options.input);
    } catch (e: any) {
      console.error(`Failed to load workflow or input: ${e.message}`);
      process.exit(1);
    }

    const kernel = new Kernel();
    await kernel.initialize();
    
    const result = await kernel.executeWorkflow(input);

    if (result.passed) {
      const artifact = result.artifacts[0];
      if (artifact) {
        await fs.writeFile(options.output, artifact.content, 'utf-8');
        console.log(`Success! Service report saved to ${options.output}`);
      } else {
        console.error('Workflow passed but no artifact was generated.');
        process.exit(1);
      }
    } else {
      console.error('\n--- WORKFLOW FAILED ---\n');
      for (const err of result.errors) {
        console.error(`Error in Step ${err.stepId} [${err.code}]: ${err.message}`);
      }
      for (const warn of result.warnings) {
        console.warn(`Warning: ${warn}`);
      }
      process.exit(1);
    }
  });

program.parse();
