import { storiesOf } from '@storybook/vue';
import { withReadme } from 'storybook-readme';
import { withKnobs, text } from '@storybook/addon-knobs';
import {{componentName}} from './{{componentName}}.vue';
import readme from './README.md';

storiesOf('{{componentName}}', module)
  .addDecorator(withReadme([readme]))
  .addDecorator(withKnobs)
  .add('Default', () => {
    return {
      components: { {{componentName}} },
      data() {
        return {};
      },
      template: '',
    }
  });