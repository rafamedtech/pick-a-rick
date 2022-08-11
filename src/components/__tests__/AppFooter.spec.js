import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import AppFooter from '../AppFooter.vue';

describe('AppFooter', () => {
  it('should render properly', () => {
    const wrapper = mount(AppFooter);

    expect(wrapper.find('footer').text()).toBe('Made by Rafamed');
  });
});
