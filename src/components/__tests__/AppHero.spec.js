import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import AppHero from '../AppHero.vue';

describe('AppHero', () => {
  it('renders properly', () => {
    const wrapper = mount(AppHero);
    expect(wrapper.find('[data-test="title"]').text()).toContain('Peek - a - Rick');
    expect(wrapper.find('section').exists()).toBeTruthy();
  });
});
