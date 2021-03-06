import sinon from 'sinon';
import assert from 'assert';

import { LocalStorageUtil } from '../js/app/util/localStorageUtil';

let store = {};

global.localStorage = {
  getItem: (key) => {
    return store[key];
  },
  setItem: (key, value) => {
    store[key] = value + '';
  },
  clear: () => {
    store = {};
  }
};

describe('LocalStorageUtil tests', () => {
  const localStorageUtil = new LocalStorageUtil();

  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize localStorage and clear it', () => {
    localStorageUtil.initLocalstorage();
    assert.deepEqual(store, { watchlist: '[]' });
  });
  describe('function tests', () => {
    beforeEach(() => {
      localStorage.clear();
      localStorageUtil.initLocalstorage();
    });

    it('should add and remove items properly', () => {
      localStorageUtil.addToWatchlist(1);
      localStorageUtil.addToWatchlist(2);
      assert.deepEqual(store, { watchlist: '[1,2]'});
      assert.deepEqual(store, { watchlist: JSON.stringify(localStorageUtil.getWatchlist()) });

      assert(localStorageUtil.isInWatchlist(1));

      localStorageUtil.removeFromWatchlist(2);
      assert.deepEqual(store, { watchlist: "[1]"});
      assert(!localStorageUtil.isInWatchlist(2));
    });

    it('should filter watchlist', () => {
      localStorageUtil.addToWatchlist(1);
      localStorageUtil.addToWatchlist(2);
      localStorageUtil.addToWatchlist(3);
      localStorageUtil.filterWatchlist([{ id: 1 }, { id: 2 }]);
      assert.deepEqual(store, { watchlist: '[1,2]' });
    });

  });
});
