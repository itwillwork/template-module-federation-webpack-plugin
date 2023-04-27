import {PluginOptionsT} from "./models";

const validateOptions = (options: PluginOptionsT): void => {
  if (!options) {
    throw new Error('Wrong "template-module-federation-webpack-plugin" plugin options: options is required')
  }

  if (!options.templateParameters) {
    throw new Error('Wrong "template-module-federation-webpack-plugin" plugin options: "options.templateParameters" is required')
  }

  if (typeof options.templateParameters !== "object") {
    throw new Error('Wrong "template-module-federation-webpack-plugin" plugin options: "options.templateParameters" should be object')
  }

  if (!Array.isArray(options.paths)) {
    throw new Error('Wrong "template-module-federation-webpack-plugin" plugin options: "options.paths" should be array')
  }

  options.paths.forEach((optionsItem) => {
    if (!optionsItem.output) {
      throw new Error('Wrong "template-module-federation-webpack-plugin" plugin options: "options.paths[number].output" is required')
    }

    if (typeof optionsItem.output !== "string") {
      throw new Error('Wrong "template-module-federation-webpack-plugin" plugin options: "options.paths[number].output" should be string')
    }

    if (!optionsItem.template) {
      throw new Error('Wrong "template-module-federation-webpack-plugin" plugin options: "options.paths[number].template" is required')
    }

    if (typeof optionsItem.template !== "string") {
      throw new Error('Wrong "template-module-federation-webpack-plugin" plugin options: "options.paths[number].template" should be string')
    }

    if (!optionsItem.inlineFilenames) {
      throw new Error('Wrong "template-module-federation-webpack-plugin" plugin options: "options.paths[number].inlineFilenames" is required')
    }

    if (!Array.isArray(optionsItem.inlineFilenames)) {
      throw new Error('Wrong "template-module-federation-webpack-plugin" plugin options: "options.paths[number].inlineFilenames" should be array')
    }

    optionsItem.inlineFilenames.forEach((filename) => {
      if (typeof filename !== "string") {
        throw new Error('Wrong "template-module-federation-webpack-plugin" plugin options: "options.paths[number].inlineFilenames[number]" should be string')
      }
    });
  });
}

export { validateOptions }
