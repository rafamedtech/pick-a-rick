import { describe, it, expect } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';
import rymDeck from '@/data/rymDeck.json';
import createDeck from '@/features/createDeck';

import GameBoard from '../GameBoard.vue';

describe('GameBoard', () => {
  it('should render', async () => {
    const wrapper = shallowMount(GameBoard, {
      props: {
        cardList: [],
        status: 'Player wins!',
      },
    });

    expect(wrapper.find('transition-group-stub').exists()).toBeTruthy();
    expect(wrapper.find('[data-test="status"]').text()).toContain(status);
  });

  it('should emit flip-card event when card is clicked', async () => {
    const { cardList } = createDeck(rymDeck);

    const wrapper = mount(GameBoard, {
      props: {
        cardList: cardList.value,
        status: 'Player wins!',
      },
    });

    await wrapper.find('[data-test="card"]').trigger('click');
    expect(wrapper.emitted('flip-card')).toBeTruthy();

    expect(wrapper.findAll('[data-test="card"]').length).toBe(cardList.value.length);
  });
});
