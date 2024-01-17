import arg from 'arg';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createComponent } from '../tasks/api-module.task';
// yarn add --dev chalk@4.1.2 arg inquirer@8.2.0 fs listr ncp util handlebars esm && npm link
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
      '--pre': String,
    },
    {
      argv: rawArgs.slice(2),
    },
  );

  return {
    skipPrompts: args['--yes'] || false,
    template: args._[0],
    prefix: args['--pre'] || '',
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'typescript';

  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push(
      {
        type: 'input',
        name: 'template',
        message: 'Enter component name',
      },
      // },
      // {
      //   type: 'list',
      //   name: 'componentType',
      //   message: 'What is the type of your component?',
      //   choices: ['atoms', 'molecules', 'organisms'],
      // }
    );
  }

  const answers = await inquirer.prompt(questions);
  if (answers.template.includes('-') || !answers.template.includes(' ')) {
    return {
      ...options,
      template: answers.template
        .split('-')
        .map((part) => part.toLowerCase())
        .join('-'),
    };
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  if (options !== undefined) {
    await createComponent(options);
  } else {
    console.error(
      `Please enter a valid component name. Allowed name formats are ${chalk.red.bold('componentname')} or ${chalk.red.bold(
        'component-name',
      )}`,
    );
  }
}
