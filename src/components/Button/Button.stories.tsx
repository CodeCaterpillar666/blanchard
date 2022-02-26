import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
    btnType: 'primary',
    size: 'lg',
    children: 'A Large Button'
};

export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
    btnType: 'primary',
    size: 'sm',
    children: 'A Small Button'
};

export const Primary = Template.bind({});
Primary.args = {
    btnType: 'primary',
    children: 'A Primary Button'
}

export const Default = Template.bind({});
Default.args = {
    btnType: 'default',
    children: 'A Default Button'
}

export const Danger = Template.bind({});
Danger.args = {
    btnType: 'danger',
    children: 'A Danger Button'
}

export const Link = Template.bind({});
Link.args = {
    btnType: 'link',
    children: 'A Link Button to this React Component GitHub Repository',
    href: 'https://github.com/CodeCaterpillar666/blanchard',
}
