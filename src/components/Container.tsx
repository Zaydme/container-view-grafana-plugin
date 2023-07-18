import React from 'react';
import { PanelProps } from '@grafana/data';
import { PluginOptions, ContainerConfig, ProductData } from 'types';
import { css, cx } from '@emotion/css';
import { Grid } from './Grid';

interface Props extends PanelProps<PluginOptions> {}

export const Container: React.FC<Props> = ({ options, data, width, height }) => {
  const containerConfigQueryRefId = options.containerConfigQueryRefId;
  const productDataQueryRefId = options.productDataQueryRefId;
  const thresholds = options.thresholds;
  const referenceDataUrl = options.referenceDataUrl;

  const containerConfig: ContainerConfig = (
    data.series.find((s) => s.refId === containerConfigQueryRefId) as any
  ).fields.reduce((acc: any, cur: any) => {
    acc[cur.name] = cur.values.get(0);
    return acc;
  }, {});

  const productData = (data.series.find((s) => s.refId === productDataQueryRefId) as any).fields.reduce(
    (acc: any, cur: any) => {
      acc[cur.name] = cur.values.toArray();
      return acc;
    },
    {}
  );

  // now we have
  // productData = {Key: Array(42), Value: Array(42), Text: Array(42), X: Array(42), Y: Array(42)}
  // map them in a single array and we will use X and Y as indexes

  const productData2D: ProductData[] = productData.X.map((x: number, i: number) => {
    return {
      Key: productData.Key[i],
      Value: productData.Value[i],
      Text: productData.Text[i],
      X: x,
      Y: productData.Y[i],
      Rotate: productData.Rotate[i],
    };
  });

  // now we have
  // productData2D = [{Key: 1, Value: 1, Text: "1", X: 1, Y: 1}, {Key: 2, Value: 2, Text: "2", X: 2, Y: 1}, ...]

  return (
    <div
      className={cx(
        css`
          width: 100%;
          height: 100%;
          padding-right: 0.5rem;
        `
      )}
    >
      {/* <h6
            className={css`
              position: absolute;
              top: 0;
              left: 0;
            `}
          >
          containerConfig.Title
        </h6> */}
      <Grid
        ParentWidth={width}
        ParentHeight={height}
        GridColumns={containerConfig.Width}
        GridRows={containerConfig.Height}
        OrderX={containerConfig.OrderX}
        OrderY={containerConfig.OrderY}
        data={productData2D}
        thresholds={thresholds}
        referenceDataUrl={referenceDataUrl}
      />
    </div>
  );
};
