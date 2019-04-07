import { <%= className %> } from './<%= name %>';

describe('<%= name %>', () => {
  it('should build', () => {
    expect(new <%= className %>()).toBeTruthy();
  });
});