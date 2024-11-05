import type { Meta, StoryObj } from '@storybook/web-components';
import DBLink from '../components/db-link/index';
import IDBLink from '../interfaces/db-link.interface';

const meta = {
  title: 'DBLink',
  tags: ['autodocs'],
  render: () => new DBLink(),
  argTypes: {
    value: { control: 'text' },
    disabled: { type: 'boolean' },
  },
  args: { value: 'Hola' },
} satisfies Meta<IDBLink>;

export default meta;
type Story = StoryObj<IDBLink>;

export const Primary: Story = {
  args: {
    value: 'Hola Mundo',
    disabled: false,
  },
};
