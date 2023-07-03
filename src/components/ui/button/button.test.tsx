import React from "react";
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react'

import { Button } from "./button";

describe('button appearance', () => {
  it('hollow button', () => {
    const tree = renderer.create(<Button/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('button with text', () => {
    const tree = renderer.create(<Button text='Hello World!' />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('blocked button', () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Button with Loader', () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('button click causes correct allert', () => {
    window.alert = jest.fn();
    render(<Button text='рецепт пельменей' onClick={() => {alert('пельмени')}} />)
    const btn = screen.getByText('рецепт пельменей');
    fireEvent.click(btn);
    expect(window.alert).toHaveBeenCalledWith('пельмени');
  })
})