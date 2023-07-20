import React from 'react';
import { ProductData, Threshold, Rotation, Order } from 'types';
import { css } from '@emotion/css';
import { GridElement } from './GridElement';

export const Grid: React.FC<{
  ParentWidth: number;
  ParentHeight: number;
  GridColumns: number;
  GridRows: number;
  OrderX: Order;
  OrderY: Order;
  Rotate: Rotation;
  data: ProductData[];
  thresholds: Threshold[];
  referenceDataUrl: string;
}> = ({
  ParentWidth,
  ParentHeight,
  GridColumns,
  GridRows,
  OrderX,
  OrderY,
  Rotate,
  data,
  thresholds,
  referenceDataUrl,
}) => {
  return (
    <>
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(
            ${GridColumns + 1},
            ${((['90', '270'].includes(Rotate) ? ParentHeight : ParentWidth) - 15) / (GridColumns + 1)}px
          );
          grid-template-rows: repeat(
            ${GridRows + 1},
            ${((['90', '270'].includes(Rotate) ? ParentWidth : ParentHeight) - 15) / (GridRows + 1)}px
          );
          justify-items: center;
          align-items: center;
          width: calc(100% - 15px);
          max-height: 100%;
          ${Rotate === '90' &&
          `
          transform: rotate(${Rotate}deg) translateY(${Math.min(-((ParentWidth / ParentHeight) * 100), -100)}%)
          translateX(${ParentHeight / ParentWidth}%);
          transform-origin: top left;
          `}
          ${Rotate === '180' &&
          `
          transform: rotate(${Rotate}deg) translateY(-100%)
          translateX(-100%);
          transform-origin: top left;
          width: 100%;
          `}
          ${Rotate === '270' &&
          `
          width: 100%;
          transform: rotate(${Rotate}deg) translateY(0%) translateX(${-((ParentHeight / ParentWidth) * 100)}%);
          transform-origin: top left;
          `}
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
                Rotate={Rotate}
                X={0}
                Y={i + 1}
              />
            }
            {new Array(GridColumns).fill(0).map((_, j) => (
              <>
                {i === GridRows ? (
                  <GridElement
                    forceShift
                    Text={
                      <div
                        className={css`
                          display: flex;
                          flex-direction: row;
                        `}
                      >
                        <span
                          className={css`
                            font-weight: bold;
                          `}
                        >
                          X <sub>{OrderX === 'ASC' ? j + 1 : GridColumns - j}</sub>
                        </span>

                        <span
                          className={css`
                            font-weight: bold;
                            position: absolute;
                            opacity: 0.5;
                            font-size: 0.8rem;
                            /* right: calc(50% - ${ParentWidth / (GridColumns + 1) / 2}px);*/
                            right: calc(
                              50% -
                                ${((['90', '270'].includes(Rotate) ? ParentHeight : ParentWidth) - 15) /
                                (GridColumns + 1) /
                                2}px
                            );
                          `}
                        >
                          {OrderX === 'ASC' ? j + 1 : GridColumns - j}
                        </span>
                      </div>
                    }
                    Value={0}
                    Rotate={Rotate}
                    X={j}
                    Y={GridRows + 1}
                  />
                ) : (
                  <>
                    {(() => {
                      const itemData = data.find(
                        (d) =>
                          d.X === (OrderX === 'ASC' ? j : GridColumns - j - 1) &&
                          d.Y === (OrderY === 'ASC' ? i : GridRows - i - 1)
                      );
                      return (
                        <GridElement
                          key={`${i}-${j}`}
                          dataKey={itemData?.Key || ''}
                          Text={itemData?.Text || ''}
                          Value={itemData?.Value || null}
                          X={itemData?.X || (OrderX === 'ASC' ? j : GridColumns - j - 1)}
                          Y={itemData?.Y || (OrderY === 'ASC' ? i : GridRows - i - 1)}
                          Rotate={Rotate || '0'}
                          isCircle={true}
                          thresholds={thresholds}
                          referenceDataUrl={referenceDataUrl}
                          maxWidth={Math.min(
                            ((['90', '270'].includes(Rotate) ? ParentHeight : ParentWidth) - 15) / (GridColumns + 1),
                            ((['90', '270'].includes(Rotate) ? ParentWidth : ParentHeight) - 15) / (GridRows + 1)
                          )}
                        />
                      );
                    })()}
                  </>
                )}
              </>
            ))}
          </>
        ))}
      </div>
    </>
  );
};
