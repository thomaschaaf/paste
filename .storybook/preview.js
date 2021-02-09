import React from 'react';
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';
import {withPerformance} from 'storybook-addon-performance';
import {Theme} from '@twilio-paste/theme';
import {Box} from '@twilio-paste/box';

export const globalTypes = {
  theme: {
    name: 'Paste Theme',
    description: 'Global theme for components',
    defaultValue: 'default',
    toolbar: {
      // All available icons
      // https://github.com/storybookjs/storybook/blob/master/lib/components/src/icon/icons.tsx
      icon: 'paintbrush',
      // array of plain string values or MenuItem shape (see below)
      items: ['sendgrid', 'console', 'default'],
    },
  },
};

function sendToFunction(metric, id) {
  const body = JSON.stringify({[metric.name]: metric.value, id});
  fetch('https://web-vitals-4499.twil.io/report', {
    body,
    method: 'POST',
    keepalive: true,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

const reportWebVitals = (id) => {
  import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
    getCLS((metric) => sendToFunction(metric, id), true);
    getFID((metric) => sendToFunction(metric, id));
    getFCP((metric) => sendToFunction(metric, id));
    getLCP((metric) => sendToFunction(metric, id), true);
    getTTFB((metric) => sendToFunction(metric, id));
  });
};

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme;
    reportWebVitals(context.id);
    return (
      <Theme.Provider theme={theme}>
        <Box padding="space40">
          <Story />
        </Box>
      </Theme.Provider>
    );
  },
  withPerformance,
];

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
