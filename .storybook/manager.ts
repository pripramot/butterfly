import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',

    // Logo
    brandTitle: 'TailNext',
    brandUrl: 'https://github.com/pripramot/butterfly',
    brandTarget: '_blank',
  }),
});
