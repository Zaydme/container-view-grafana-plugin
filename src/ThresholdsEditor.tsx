import React from 'react';
import { ColorPicker, Input, Icon, stylesFactory } from '@grafana/ui';
import { css } from '@emotion/css';
import { config } from '@grafana/runtime';
import { GrafanaTheme } from '@grafana/data';

const Prefix = ({ styles, ...props }: any) => (
  <div className={styles.inputPrefix}>
    <div className={styles.colorPicker}>
      <ColorPicker color={props.color} onChange={props.onChange} enableNamedColors={false} />
    </div>
  </div>
);

const Suffix = ({ styles, ...props }: any) => (
  <div className={styles.inputPrefix}>
    <Icon className={styles.trashIcon} name="trash-alt" onClick={props.onClick} />
  </div>
);

export function ThresholdsEditor(props: any) {
  const styles = getStyles(config.theme);

  return (
    <div>
      <button
        className={css`
          width: 100%;
        `}
        onClick={() =>
          props.onChange([
            ...props.value,
            { color: 'grey', value: Math.max(...props.value.map((v: any) => v.value)) + 1 },
          ])
        }
      >
        Add threshold
        <Icon name="plus" />
      </button>
      {props.value.map(
        (
          {
            color,
            value,
          }: {
            color: string;
            value: number;
          },
          i: number
        ) => (
          <Input
            type="text"
            value={value}
            onChange={(e) => {
              props.onChange(
                props.value.map((v: any, j: number) => {
                  if (i === j) {
                    return { ...v, value: e.currentTarget.value };
                  }
                  return v;
                })
              );
            }}
            onBlur={() => {
              // sort thresholds by value
              props.onChange(
                props.value.sort((a: any, b: any) => {
                  return a.value - b.value;
                })
              );
            }}
            prefix={
              <Prefix
                styles={styles}
                color={color}
                onChange={(e: any) => {
                  props.onChange(
                    props.value.map((v: any, j: number) => {
                      if (i === j) {
                        return { ...v, color: e };
                      }
                      return v;
                    })
                  );
                }}
              />
            }
            suffix={
              <Suffix
                styles={styles}
                onClick={() => props.onChange(props.value.filter((_: any, j: number) => i !== j))}
              />
            }
            key={i}
          />
        )
      )}
    </div>
  );
}

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    colorPicker: css`
      padding: 0 ${theme.spacing.sm};
    `,
    inputPrefix: css`
      display: flex;
      align-items: center;
    `,
    trashIcon: css`
      color: ${theme.colors.textWeak};
      cursor: pointer;
      &:hover {
        color: ${theme.colors.text};
      }
    `,
  };
});
