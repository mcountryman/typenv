import "reflect-metadata";
import { IMetadata } from "./metadata";

export interface IConfigReflector<TConfig> {
  create(): TConfig;
  getAllPropertyInfo(target: TConfig): IMetadata[];
}
