import React from "react";
import renderer from 'react-test-renderer';

import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe('Circle component', () => {
  it('hollow circle', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('circle with letter', () => {
    const tree = renderer.create(<Circle letter="a" />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('circle with letter in head', () => {
    const tree = renderer.create(<Circle head="1"/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('circle with react elem in head', () => {
    const tree = renderer.create(<Circle head={<Circle letter="a" isSmall={true} />} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('circle with letter in tail', () => {
    const tree = renderer.create(<Circle tail="a" />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('circle with react elem in tail', () => {
    const tree = renderer.create(<Circle tail={<Circle letter="a" isSmall={true} />} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('circle with index', () => {
    const tree = renderer.create(<Circle index={15} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('circle with isSmall = true', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('circle with state default', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('circle with state changing', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('circle with state modified', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})