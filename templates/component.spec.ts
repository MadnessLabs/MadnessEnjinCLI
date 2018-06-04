import { flush, render } from '@stencil/core/testing';
import { <%= className %> } from './<%= name %>';

describe('<%= name %>', () => {
  it('should build', () => {
    expect(new <%= className %>()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [<%= className %>],
        html: '<<%= name %>></<%= name %>>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent).toEqual('<%= content %>');
    });
  });
});