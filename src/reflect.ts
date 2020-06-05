import "reflect-metadata";
import { IMetadata } from "./metadata";

export interface IConfigReflector<TConfig> {
  create(): TConfig;
  getMetadata(target: TConfig): IMetadata[];
}
