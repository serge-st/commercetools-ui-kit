const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const camelCase = require('lodash/camelCase');
const prettier = require('prettier');
const rcfile = require('rcfile');

const prettierConfig = rcfile('prettier');

const definitions = yaml.parse(
  fs.readFileSync(
    path.join(__dirname, '../materials/internals/definition.yaml'),
    'utf8'
  )
);

const endProgram = (message) => {
  // eslint-disable-next-line no-console
  console.error(`Custom Properties Error: ${message}`);
  process.exit(1);
};

const TOKEN_REGEX = /^(\w+(?:-\w+)(?:-\w+)?)(?:-for-(\w+(?:-\w+)?))?(?:-when-([\w-]+?))?(?:-on-([\w-]+?))?$/i;

const supportedStates = Object.keys(definitions.states);
const supportedComponentGroups = Object.keys(definitions.componentGroups);

const tokens = {};
const designTokens = {};

Object.values(definitions.choiceGroups).forEach((choiceGroup) => {
  Object.entries(choiceGroup.choices).forEach(([key, value]) => {
    if (tokens[key]) endProgram(`Token "${key} already exists!"`);

    if (key !== key.toLowerCase())
      endProgram(`Tokens "${key}" must be lower case`);

    if (!key.startsWith(choiceGroup.prefix))
      endProgram(
        `Expected token "${key}" to start with "${choiceGroup.prefix}" as it is an "${choiceGroup.label}" attribute.`
      );

    tokens[key] = value;
  });
});

Object.values(definitions.decisionGroups).forEach((decisionGroup) => {
  Object.entries(decisionGroup.decisions).forEach(([key, decision]) => {
    if (tokens[key]) endProgram(`Token "${key} already exists!"`);
    if (key !== key.toLowerCase())
      endProgram(`Tokens "${key}" must be lower case`);
    if (!decision.choice) {
      endProgram(`You forgot to specify a choice for ${decision}`);
    }
    if (!tokens[decision.choice]) {
      endProgram(`Choice called "${decision.choice}" was not found!`);
    }
    // TODO parse token name and warn when invalid name was given and token
    // is not deprecated

    const match = key.match(TOKEN_REGEX);

    if (match) {
      const componentGroup = match[2];
      const state = match[3];

      if (componentGroup && !supportedComponentGroups.includes(componentGroup))
        endProgram(
          `Token "${key}" uses unsupported component group "${componentGroup}"!`
        );

      if (state && !supportedStates.includes(state))
        endProgram(`Token "${key}" uses unsupported state "${state}"!`);
    } else if (!decision.deprecated) {
      endProgram(
        `Token "${key}" does not follow <attribute>-for-<component-group>-when-<state>-on-dark naming scheme! Tokens not following this scheme must use "deprecated" flag.`
      );
    }

    designTokens[key] = decision.choice;
    tokens[key] = tokens[decision.choice];
  });
});

// Copy over plain tokens
Object.entries(definitions.plainTokens).forEach(([key, value]) => {
  if (tokens[key]) endProgram(`Token called "${key} already exists!"`);

  tokens[key] = value;
});

// Write files
const printJson = (data) =>
  JSON.stringify(
    Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`--${key}`]: value,
      }),
      {}
    )
  );

const printJavaScript = (data, camelCaseValue = false) => `
/*
  THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

  This file is created by the 'scripts/generate-custom-properties.js' script.
  The variables should be updated in 'materials/internals/definition.yaml'.
*/

export default {
${Object.entries(data)
  .map(
    ([key, value]) =>
      `${camelCase(key)}: "${camelCaseValue ? camelCase(value) : value}",`
  )
  .join('\n')}
};
`;

const printTypeScript = (data, camelCaseValue = false) => `
/*
  THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

  This file is created by the 'scripts/generate-custom-properties.js' script.
  The variables should be updated in 'materials/internals/definition.yaml'.
*/

type CustomProperties = {
${Object.entries(data)
  .map(
    ([key, value]) =>
      `${camelCase(key)}: "${camelCaseValue ? camelCase(value) : value}",`
  )
  .join('\n')}
};
const customProperties: CustomProperties = {
  ${Object.entries(data)
    .map(
      ([key, value]) =>
        `${camelCase(key)}: "${camelCaseValue ? camelCase(value) : value}",`
    )
    .join('\n')}
};
export default customProperties;
`;

const printCss = (data) => `
/*
  THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

  This file is created by the 'scripts/generate-custom-properties.js' script.
  The variables should be updated in 'materials/internals/definition.yaml'.
*/

:root {
  ${Object.entries(data)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n')}
}
`;

fs.writeFileSync(
  path.join(__dirname, '../materials/custom-properties.json'),
  prettier.format(printJson(tokens), {
    ...prettierConfig,
    parser: 'json',
  })
);

fs.writeFileSync(
  path.join(__dirname, '../materials/design-tokens.js'),
  prettier.format(printJavaScript(designTokens, true), prettierConfig)
);

fs.writeFileSync(
  path.join(__dirname, '../materials/custom-properties.js'),
  prettier.format(printJavaScript(tokens), prettierConfig)
);

fs.writeFileSync(
  path.join(__dirname, '../materials/custom-properties.ts'),
  prettier.format(printTypeScript(tokens), prettierConfig)
);

fs.writeFileSync(
  path.join(__dirname, '../materials/custom-properties.css'),
  prettier.format(printCss(tokens), {
    ...prettierConfig,
    parser: 'css',
  })
);
