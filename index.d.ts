import { PluginDef } from 'ream'

export interface Options {
  extensions: string[]
  serverTypeChecks: boolean
  clientTypeChecks: boolean
  tsLoaderOptions: {
    appendTsSuffixTo: Array<string | RegExp>
    transpileOnly: boolean
  }
}

export default function (options?: Partial<Options>): PluginDef
