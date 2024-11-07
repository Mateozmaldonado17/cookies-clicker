import { assert } from '@open-wc/testing';
import AppMain from './app-main';
describe('index', () => {
  it('is defined', () => {
    const el = document.createElement('app-main');
    assert.instanceOf(el, AppMain);
  });
});
