import React from 'react';
import { Threshold } from 'types';
import { css } from '@emotion/css';

export const GridElement: React.FC<{
  Text: string | JSX.Element;
  Value: number | null;
  X: number;
  Y: number;
  dataKey?: string;
  isCircle?: boolean;
  thresholds?: Threshold[];
  referenceDataUrl?: string;
}> = ({ Text, Value, X, Y, dataKey, isCircle, thresholds, referenceDataUrl }) => {
  const getBackgroundColor = (value: number) => {
    const threshold = thresholds
      ?.filter((t) => t.value <= value)
      .sort((a, b) => a.value - b.value)
      .pop();
    return threshold?.color || '#fff';
  };

  return (
    <span
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1/1;
        max-height: 90%;
        min-height: 90%;
        ${isCircle &&
        css`
          border-radius: 50%;
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
  );
};
