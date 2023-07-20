export type Order = 'ASC' | 'DESC';
export type Rotation = '0' | '90' | '180' | '270';

export type Threshold = {
  color: string;
  value: number;
};

export interface PluginOptions {
  containerConfigQueryRefId: string;
  productDataQueryRefId: string;
  referenceDataUrl: string;
  thresholds: Threshold[];
}

export interface ContainerConfig {
  Title: string;
  Height: number;
  Width: number;
  OrderX: Order;
  OrderY: Order;
  Rotate: Rotation;
}

export interface ProductData {
  Key: string;
  Text: string;
  Value: number;
  X: number;
  Y: number;
}
