import sinon from 'sinon';

import { MainController } from '../js/app/controller/mainController';
import { MainModel } from '../js/app/model/mainModel';

describe('MainController', function() {
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
  }
  it('should create a controller', function() {
    const mc = new MainController();
  });
});
