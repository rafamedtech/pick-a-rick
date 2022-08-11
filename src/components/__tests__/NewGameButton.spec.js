import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import NewGameButton from '../NewGameButton.vue';

describe('NewGameButton', () => {
  it('should render start game button properly', async () => {
    const wrapper = mount(NewGameButton, { props: { newPlayer: true } });
    const button = wrapper.find('[data-test="start-button"]');

    await button.trigger('click');

    // Asserts
    expect(button.exists()).toBeTruthy();
    expect(wrapper.emitted('start-new-game')).toBeTruthy();
  });

  it('should render restart game button properly', async () => {
    const wrapper = mount(NewGameButton, { props: { newPlayer: false } });
    const button = wrapper.find('[data-test="restart-button"]');

    await button.trigger('click');

    // Asserts
    expect(button.exists()).toBeTruthy();
    expect(wrapper.emitted('start-new-game')).toBeTruthy();
  });

  // it('should create a new game', async () => {
  //   const wrapper = mount(NewGameButton, { props: { newPlayer: true } });
  //   const button = wrapper.find('[data-test="start-button"]');

  //   await button.trigger('click');

  //   // Asserts
  //   expect(wrapper.emitted('start-new-game')).toBeTruthy();
  // });

  // it('should restart the game', async () => {
  //   const wrapper = mount(NewGameButton, { props: { newPlayer: false } });
  //   const button = wrapper.find('[data-test="restart-button"]');

  //   await button.trigger('click');

  //   // Asserts
  //   expect(wrapper.emitted('start-new-game')).toBeTruthy();
  // });
});
