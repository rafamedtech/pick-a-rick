import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import GameCard from '../GameCard.vue';

describe('GameCard', () => {
  it('should render', () => {
    const wrapper = mount(GameCard, {
      props: {
        matched: true,
        position: 0,
        value: 'rick',
        visible: false,
      },
    });

    expect(wrapper.find('[data-test="game-card"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="image"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="checkmark"]').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="backface"]').exists()).toBeTruthy();
  });

  it('should emit select-card event when card is clicked', async () => {
    const wrapper = mount(GameCard, {
      props: {
        matched: true,
        position: 0,
        value: 'rick',
        visible: false,
      },
    });

    await wrapper.find('[data-test="game-card"]').trigger('click');
    expect(
      wrapper.emitted('select-card', {
        position: wrapper.props.position,
        faceValue: wrapper.props.value,
      })
    ).toBeTruthy();
  });
});
