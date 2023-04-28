import fs from 'fs';
import ejs from 'ejs';
import type {Compiler} from 'webpack';
import type { PluginOptionsT } from './models';
import {validateOptions} from "./validate-options";

const INLINE_FILES_CONTENT = '<%- inlineFilesContent %>';

class TemplateModuleFederationPlugin {
  static defaultOptions: PluginOptionsT = {
    templateParameters: {},
    paths: [],
  };

  options: PluginOptionsT;

  constructor(options: PluginOptionsT) {
    validateOptions(options);

    this.options = {
      ...TemplateModuleFederationPlugin.defaultOptions,
      ...(options || {}),
    };
  }

  apply(compiler: Compiler) {
    const pluginName = TemplateModuleFederationPlugin.name;

    const { webpack } = compiler;
    const { Compilation } = webpack;

    const { RawSource } = webpack.sources;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          const templateParameters = {
            ...this.options.templateParameters,
            compilation,
          };

          this.options.paths.forEach((pathConfig) => {
            let template = fs.readFileSync(pathConfig.template, 'utf8');

            if (!template.includes(INLINE_FILES_CONTENT)) {
              template += INLINE_FILES_CONTENT;
            }

            const inlineFilesContent = pathConfig.inlineFilenames
              .map((inlineFilename) => {
                return `<%- compilation.assets["${inlineFilename}"].source() %>`;
              })
              .join('\n');

            template = template.replace(
              INLINE_FILES_CONTENT,
              inlineFilesContent,
            );

            const renderedTemplate = ejs.render(
              template,
              templateParameters,
              {},
            );

            compilation.emitAsset(
              pathConfig.output,
              new RawSource(renderedTemplate),
            );
          });
        },
      );
    });
  }
}

export { TemplateModuleFederationPlugin };
