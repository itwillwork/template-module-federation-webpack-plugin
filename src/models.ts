export type PluginOptionsT = {
  templateParameters: Record<string, any>;
  paths: Array<{
    template: string;
    output: string;
    inlineFilenames: Array<string>;
  }>
};
