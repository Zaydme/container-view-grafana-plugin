import React from 'react';
import { ProductData, Threshold } from 'types';
import { css } from '@emotion/css';
import { GridElement } from './GridElement';

export const Grid: React.FC<{
  ParentWidth: number;
  ParentHeight: number;
  GridColumns: number;
  GridRows: number;
  OrderX: 'ASC' | 'DESC';
  OrderY: 'ASC' | 'DESC';
  data: ProductData[];
  thresholds: Threshold[];
  referenceDataUrl: string;
}> = ({ ParentWidth, ParentHeight, GridColumns, GridRows, OrderX, OrderY, data, thresholds, referenceDataUrl }) => {
  return (
    <>
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(${GridColumns + 1}, ${ParentWidth / (GridColumns + 1)}px);
          grid-template-rows: repeat(${GridRows + 1}, ${ParentHeight / (GridRows + 1)}px);
          justify-items: center;
          align-items: center;
          width: 100%;
          max-height: 100%;
        `}
      >
        {new Array(GridRows + 1).fill(0).map((_, i) => (
          <>
            {
              <GridElement
                Text={
                  <span
                    className={css`
                      opacity: ${i < GridRows ? 1 : 0};
                    `}
                  >
                    <span
                      className={css`
                        font-weight: bold;
                      `}
                    >
                      Y
                    </span>
                    <sub>{OrderY === 'ASC' ? i + 1 : GridRows - i}</sub>
                  </span>
                }
                Value={0}
                X={0}
                Y={i + 1}
              />
            }
            {new Array(GridColumns).fill(0).map((_, j) => (
              <>
                {i === GridRows ? (
                  <GridElement
                    Text={
                      <span>
                        <span
                          className={css`
                            font-weight: bold;
                          `}
                        >
                          X
                        </span>
                        <sub>{OrderX === 'ASC' ? j + 1 : GridColumns - j}</sub>
                      </span>
                    }
                    Value={0}
                    X={j}
                    Y={GridRows + 1}
                  />
                ) : (
                  <GridElement
                    key={`${i}-${j}`}
                    dataKey={
                      data.find(
                        (d) =>
                          d.X === (OrderX === 'ASC' ? j : GridColumns - j - 1) &&
                          d.Y === (OrderY === 'ASC' ? i : GridRows - i - 1)
                      )?.Key || ''
                    }
                    Text={
                      data.find(
                        (d) =>
                          d.X === (OrderX === 'ASC' ? j : GridColumns - j - 1) &&
                          d.Y === (OrderY === 'ASC' ? i : GridRows - i - 1)
                      )?.Text || ''
                    }
                    Value={
                      data.find(
                        (d) =>
                          d.X === (OrderX === 'ASC' ? j : GridColumns - j - 1) &&
                          d.Y === (OrderY === 'ASC' ? i : GridRows - i - 1)
                      )?.Value || null
                    }
                    X={
                      data.find(
                        (d) =>
                          d.X === (OrderX === 'ASC' ? j : GridColumns - j - 1) &&
                          d.Y === (OrderY === 'ASC' ? i : GridRows - i - 1)
                      )?.X || 0
                    }
                    Y={
                      data.find(
                        (d) =>
                          d.X === (OrderX === 'ASC' ? j : GridColumns - j - 1) &&
                          d.Y === (OrderY === 'ASC' ? i : GridRows - i - 1)
                      )?.Y || 0
                    }
                    isCircle={true}
                    thresholds={thresholds}
                    referenceDataUrl={referenceDataUrl}
                  />
                )}
              </>
            ))}
          </>
        ))}
      </div>
    </>
  );
};
