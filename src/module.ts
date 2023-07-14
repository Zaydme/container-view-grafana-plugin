import { PanelPlugin } from '@grafana/data';
import { PluginOptions } from './types';
import { Container } from './components/Container';
import { ThresholdsEditor } from './ThresholdsEditor';

export const plugin = new PanelPlugin<PluginOptions>(Container).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'containerConfigQueryRefId',
      name: 'Container config query name',
      description: 'Name of the query that returns container configuration',
      defaultValue: 'container_config',
    })
    .addTextInput({
      path: 'productDataQueryRefId',
      name: 'Product data query name',
      description: 'Name of the query that returns product data',
      defaultValue: 'product_data',
    })
    .addTextInput({
      path: 'referenceDataUrl',
      name: 'Reference data URL',
      description:
        'URL of the reference data {X}, {Y}, {KEY}, {VALUE}, {TEXT} will be replaced by the corresponding values',
      defaultValue: '',
    })
    .addCustomEditor({
      id: 'thresholds',
      path: 'thresholds',
      name: 'Thresholds',
      editor: ThresholdsEditor,
      defaultValue: [
        {
          color: 'green',
          value: 0,
        },
        {
          color: 'orange',
          value: 50,
        },
        {
          color: 'red',
          value: 90,
        },
      ],
    });
});
