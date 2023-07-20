import React from 'react';
import { Threshold } from 'types';
import { css } from '@emotion/css';
import { Tooltip } from '@grafana/ui';

export const GridElement: React.FC<{
  Text: string | JSX.Element;
  Value: number | null;
  X: number;
  Y: number;
  Rotate: string;
  dataKey?: string;
  isCircle?: boolean;
  thresholds?: Threshold[];
  referenceDataUrl?: string;
  forceShift?: boolean;
  maxWidth?: number;
}> = ({ Text, Value, X, Y, dataKey, isCircle, thresholds, referenceDataUrl, Rotate, forceShift, maxWidth }) => {
  const getBackgroundColor = (value: number) => {
    const threshold = thresholds
      ?.filter((t) => t.value <= value)
      .sort((a, b) => a.value - b.value)
      .pop();
    return threshold?.color || '#fff';
  };

  return (
    <Tooltip content={`key: ${dataKey} value: (${Value}) text: "${Text}" x: ${X} y: ${Y} rotation: ${Rotate}deg`}>
      <span
        className={css`
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          aspect-ratio: 1/1;
          ${forceShift &&
          css`
            margin-left: -50%;
          `}
          ${!isCircle &&
          css`
            span {
              transform: rotate(${360 - parseInt(Rotate, 10)}deg);
            }
          `}
          ${isCircle &&
          css`
            transform: rotate(${360 - parseInt(Rotate, 10)}deg);
            width: ${maxWidth}px;
            height: ${maxWidth}px;
            margin-left: ${Y % 2 !== 0 ? '50%' : '-50%'};
            border-radius: 50%;
            aspect-ratio: 1/1;
            background-color: ${Value !== null && !isNaN(Value) ? getBackgroundColor(Value) : '#fff'};
            color: #000;
            border: 2px solid #555555;
            &:hover {
              border: 2px solid #fff;
              transition: border 0.2s ease-in-out;
              cursor: ${referenceDataUrl && referenceDataUrl !== '' ? 'pointer' : 'default'};
            }
          `};
        `}
        onClick={() => {
          if (referenceDataUrl && referenceDataUrl !== '') {
            window.open(
              referenceDataUrl
                .replace('{X}', X.toString())
                .replace('{Y}', Y.toString())
                .replace('{KEY}', dataKey?.toString() || '')
                .replace('{VALUE}', Value?.toString() || '')
                .replace('{TEXT}', Text.toString()),
              '_blank'
            );
          }
        }}
      >
        {Text}
      </span>
    </Tooltip>
  );
};
