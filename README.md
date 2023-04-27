# template-module-federation-webpack-plugin

`html-webpack-plugin` for module federation

## Installation

```
npm i --save-dev template-module-federation-webpack-plugin
```

## Usage

Create template, for example `src/templates/widget.ejs`:
```ejs
console.info('Version: <%= VERSION %>');
window.CONFIG = '{{ clientConfig }}';
```

Add webpack plugin to config:
```js
import { TemplateModuleFederationPlugin } from 'template-module-federation-webpack-plugin';

// ...

plugins: [
    // ...
    new ModuleFederationPlugin({
        // ...
        filename: 'widget.js',
        // ...
    }),
    // ...
    new TemplateModuleFederationPlugin({
      templateParameters: {
        VERSION: 'v1.2',
      },
      paths: [
        {
          template: 'src/templates/widget.ejs',
          output: 'widget-entry.js',
          inlineFilenames: ['widget.js'],
        },
      ],
    }),
    //...
]
```

## Options

| Option  | Type | Description |
| ------------- | ------------- | ------------- |
| templateParameters | object | The object that is passed to the template engine. In the template, for example `templateParameters: { foo: 'bar' }`, you can use `<%= foo %>` (without formatting `<%- foo %>`) |
| paths[number].template | string | Path to the template  |
| paths[number].output | string | Path to the output file |
| paths[number].inlineFilenames | Array<string>     | Inline file names |

## Advanced Usage

##### Add inline scripts

For example, add inline script `analytics.js` (entry) to template `src/templates/widget.ejs`:
```ejs
// ...
<%- compilation.assets["analytics.js"].source() %>
// ...
```

##### Move inline scripts

For example, move inline scripts into template `src/templates/widget.ejs`:
```ejs
console.log("start");
// ...
<%- inlineFilesContent %>
// ...
console.log("end");
```
