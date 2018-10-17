declare module 'ream' {
  import express from 'express'
  import webpack from 'webpack'
  import WebpackChainConfig from 'webpack-chain'

  export interface LogOptions {
    logLevel: number
    debug: boolean
    silly: boolean
    quiet: boolean
    logUpdate: boolean
  }

  export interface Options extends LogOptions {
    dev: boolean
    baseDir: string
    config: string | false
    inspectWebpack: boolean
  }

  export interface WebpackConfigContext {
    isServer: boolean
    isClient: boolean
    dev: boolean
    type: string
  }

  export type ChainWebpackFn = (config: WebpackChainConfig, context: WebpackConfigContext) => void

  export type ConfigureWebpackFn = (config: webpack.Configuration, context: WebpackConfigContext) => void

  export type ConfigureServerFn = (server: express.Express) => void

  export type GeneratedRoutes = string[]

  export interface PluginDef {
    name: string
    apply: (ream: Ream) => void
  }

  export interface GenerateOptions {
    routes: GeneratedRoutes
  }

  export interface Config {
    entry: string
    outDir: string
    fsRoutes: boolean | {
      baseDir: string
      basePath: string
      match: RegExp
    }
    transpileDependencies: string[]
    runtimeCompiler: boolean
    productionSourceMap: boolean
    chainWebpack: ChainWebpackFn
    configureWebpack: ConfigureWebpackFn
    server: {
      port: number
      host: string
    }
    plugins: PluginDef[]
    generate: GenerateOptions
    css: {
      extract: boolean
    }
    pwa: boolean
    minimize: boolean
    defaultBabelPreset: 'minimal' | false
  }

  export class Ream {
    constructor(options?: Partial<Options>, config?: Partial<Config>)
    chainWebpack(ChainWebpackFn): void
    addGenerateRoutes(GeneratedRoutes): void
    hasPlugin(string): PluginDef
    loadPlugins(): void
    createConfigs(): void
    createCompilers(): void
    build(): Promise<void>
    generate(opts?: GenerateOptions): Promise<void>
    generateOnly(opts?: GenerateOptions): Promise<void>
    configureServer(fn: ConfigureServerFn): void
    prepareFiles(): Promise<void>
    writeCreateAppFile(): Promise<void>
    writeEntryFile(): Promise<void>
    getServer(): Promise<express.Express>
    getRequestHandler(): Promise<express.Application>
    start(): Promise<void>
    prepareWebpack(): Promise<void>
    prepareProduction(): Promise<void>
    createRenderer({ serverBundle, clientManifest, serverType }: { serverBundle: string | object, clientManifest: object, serverType: 'generate' | 'production' }): void
    resolveOutDir(...args): string
    resolveBaseDir(...args): string
  }

  export default function ream(options?: Partial<Options>, config?: Partial<Config>): Ream
}

declare module 'ream-typescript' {
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
}
