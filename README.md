# specify-cli

This CLI allows you to create a component with a specific structure:

```
└── MyComponent
    ├── MyComponent.vue
    ├── MyComponent.md
    ├── MyComponent.scss
    └── MyComponent.story.js
```

The component will be created in the chosen atomic folder.

## Requirements

Your components folder must have the following structure:

```
└── components
    ├── 01-atoms
    ├── 02-molecules
    ├── 03-organisms
    ├── 04-layouts
    └── 05-pages
```

## Usage

1. Create at your project root a `.env` file with `SP_COMPONENTS_FILE_PATH=YOUR_COMPONENTS_FOLDER_PATH` where `YOUR_COMPONENTS_FOLDER_PATH` points to the folder containing the atomic folders.
2. To create a new component inside your project run: `sp new YourComponent`

## Gotchas
To make the `sp` command available for our current node version we have to install our package first by doing: `npm i -g ./`.
Our `sp` command must be executed as a binary as stated in the `package.json`.
To know where our binary has been installed we do `which sp`.
