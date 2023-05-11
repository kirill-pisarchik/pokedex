import React from 'react';
import {render, screen} from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  it('should render children correctly', () => {
    render(<Card>Hello world</Card>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('should apply custom className correctly', () => {
    render(<Card className="custom">Hello world</Card>);
    expect(screen.getByText('Hello world')).toHaveClass('custom');
  });
});
