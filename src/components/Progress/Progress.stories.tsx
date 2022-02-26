import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Progress from './progress';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Progress',
  component: Progress,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Progress>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} />;

export const ProgressWithoutText = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ProgressWithoutText.args = {
    percent: 50,
    showText: false,
};

export const ProgressWithText = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ProgressWithText.args = {
    percent: 50,
    showText: true,
};
