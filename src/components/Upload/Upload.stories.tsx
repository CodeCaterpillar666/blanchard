import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import Icon from '../Icon/icon'
import Upload from './upload';
import Button from '../Button/button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Upload',
  component: Upload,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Upload>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof Upload> = (args) => <Upload {...args} />;

export const SimpleUploadButton = () => {
    return (
        <Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            action="https://jsonplaceholder.typicode.com/posts"
            onChange={action('changed')}
            onRemove={action('removed')}
            name="fileName"
            multiple
        >
            <Button btnType='primary'>
                Upload
            </Button>
        </Upload>
    )
}

export const DragAndDropUpload = () => {
    const iconStyle = {
        paddingBottom: '20px',
    }
    return (
        <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={action('changed')}
            onRemove={action('removed')}
            name="fileName"
            multiple
            drag
        >
            <Icon icon="upload" size="5x" theme="secondary" style={iconStyle}/>
            <br />
            <p>Drag file over to upload</p>
        </Upload>
    )
}
