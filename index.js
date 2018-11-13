#!/usr/bin/env node

const program = require('commander');
const Path = require('path');
const { spawnSync } = require('child_process');
const listSelector = require('select-shell');
const fs = require('fs');
const dotEnv = require('dotenv');
const componentDictionnary = {
  'Atom': '01-atoms',
  'Molecule': '02-molecules',
  'Organism': '03-organisms',
  'Layout': '04-layouts',
  'Page': '05-pages',
};

async function selectComponentType() {
  return new Promise((resolve) => {
    const componentTypeList = listSelector({
      pointer: ' ▸ ',
      pointerColor: 'white',
      multiSelect: false,
    });

    console.log('\nSelect a component type:\n');

    componentTypeList
      .option('Atom')
      .option('Molecule')
      .option('Organism')
      .option('Layout')
      .option('Page')
      .list();

    componentTypeList.on('select', (type) => {
      return resolve(componentDictionnary[type[0].value]);
    });
  });
}

program
  .command('new <name>')
  .description('Create a new component')
  .action(async (name) => {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const componentsPath = dotEnv.config({
      path: Path.resolve(process.cwd(), '.env')
    });
    try {
      const type = await selectComponentType();
      const storyTemplate = fs.readFileSync('./fileTemplates/componentStory.js', 'utf8');
      const componentTemplate = fs.readFileSync('./fileTemplates/componentTemplate.js', 'utf8');
      const path = Path.resolve(__dirname, componentsPath.parsed.SP_COMPONENTS_FILE_PATH, `./${type}`);
      spawnSync('mkdir', [`${path}/${name}`]);
      fs.writeFileSync(`${path}/${name}/${name}.story.js`, storyTemplate.replace(/\{\{componentName\}\}/gm, name));
      fs.writeFileSync(`${path}/${name}/${name}.vue`, componentTemplate.replace(/\{\{componentName\}\}/gm, name));
    } catch (error) {
      console.log(error);
    }

    process.exit();
});

program.parse(process.argv);