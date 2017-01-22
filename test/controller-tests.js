import sinon from 'sinon';
import assert from 'assert';

import { MainController } from '../js/app/controller/mainController';
import { MainModel } from '../js/app/model/mainModel';

import { JqueryUtil } from '../js/app/util/jqueryUtil';
import { LocalStorageUtil } from '../js/app/util/localStorageUtil';

import { testData } from './testData'

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


describe('MainControllerTests', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  const fakeJqueryUtil = new JqueryUtil();

  describe('Constructor without data', () => {
    let util, sandbox, clearStub, radioStub;

    before(() => {
      sandbox = sinon.sandbox.create();
      clearStub = sandbox.stub(fakeJqueryUtil, 'clearVideoContainer');
      radioStub = sandbox.stub(fakeJqueryUtil, 'getRadioValue');
      util = {
        jqueryUtil: fakeJqueryUtil,
        localStorageUtil: new LocalStorageUtil()
      }
    });

    after(() => {
      sandbox.restore();
    });

    it('should create a controller', () => {
      const mainController = new MainController('', util);
      assert(mainController);
      assert.deepEqual(mainController.data, []);
    });

    it('should throw an error if utils are not defined', () => {
      assert.throws(() => {
        const mainController = new MainController();
      });
    });
  });

  describe('Constructor with data', () => {
    let util, sandbox, clearStub, radioStub, filterStub, directionStub, appendStub;

    before(() => {
      sandbox = sinon.sandbox.create();
      clearStub = sandbox.stub(fakeJqueryUtil, 'clearVideoContainer');
      radioStub = sandbox.stub(fakeJqueryUtil, 'getRadioValue');
      filterStub = sandbox.stub(fakeJqueryUtil, 'getFilterProperty', () => 'title');
      directionStub = sandbox.stub(fakeJqueryUtil, 'getSortDirection', () => 1);
      appendStub = sandbox.stub(fakeJqueryUtil, 'appendTo');
      util = {
        jqueryUtil: fakeJqueryUtil,
        localStorageUtil: new LocalStorageUtil()
      }
    });

    after(() => {
      sandbox.restore();
    });

    it('should create a controller with data', () => {
      const mainController = new MainController(testData, util);
      assert.deepEqual(mainController.data, testData);
      sinon.assert.calledOnce(clearStub);
      sinon.assert.calledOnce(radioStub);

      // 3 appendTo call per createVideoElement
      sinon.assert.callCount(appendStub, mainController.data.length * 3);
    });
  });

  describe('CreateVideoElement', () => {
    let util, sandbox, clearStub, radioStub, filterStub, directionStub, appendStub;

    let mainController;

    before(() => {
      sandbox = sinon.sandbox.create();
      clearStub = sandbox.stub(fakeJqueryUtil, 'clearVideoContainer');
      filterStub = sandbox.stub(fakeJqueryUtil, 'getFilterProperty', () => 'title');
      directionStub = sandbox.stub(fakeJqueryUtil, 'getSortDirection', () => 1);
      appendStub = sandbox.stub(fakeJqueryUtil, 'appendTo');

      radioStub = sandbox.stub(fakeJqueryUtil, 'getRadioValue');
      radioStub.onCall(0).returns('live');
      radioStub.onCall(1).returns('offline');
      radioStub.onCall(2).returns('video');

      util = {
        jqueryUtil: fakeJqueryUtil,
        localStorageUtil: new LocalStorageUtil()
      }
    });
    after(() => {
      sandbox.restore();
    });

    afterEach(() => {
      appendStub.reset();
    });

    it('create only live media entries', () => {
      mainController = new MainController(testData, util);
      sinon.assert.callCount(appendStub, 6);
    });

    it('create only offline media entries', () => {
      mainController = new MainController(testData, util);
      sinon.assert.notCalled(appendStub);
    });

    it('create only video media entries', () => {
      mainController = new MainController(testData, util);
      sinon.assert.calledThrice(appendStub);
    });
  });

  describe('CustomSort', () => {
    let util, sandbox, clearStub, radioStub, filterStub, directionStub;

    before(() => {
      sandbox = sinon.sandbox.create();
      clearStub = sandbox.stub(fakeJqueryUtil, 'clearVideoContainer');
      radioStub = sandbox.stub(fakeJqueryUtil, 'getRadioValue');

      filterStub = sandbox.stub(fakeJqueryUtil, 'getFilterProperty');
      directionStub = sandbox.stub(fakeJqueryUtil, 'getSortDirection');

      filterStub.onCall(0).returns('title');
      filterStub.onCall(1).returns('title');
      filterStub.onCall(2).returns('id');
      filterStub.onCall(3).returns('description');
      filterStub.onCall(4).returns('location.country');
      directionStub.onCall(0).returns(1); // ascending
      directionStub.onCall(1).returns(-1); // descending
      directionStub.onCall(2).returns(-1);
      directionStub.onCall(3).returns(1);
      directionStub.onCall(4).returns(1);

      util = {
        jqueryUtil: fakeJqueryUtil,
        localStorageUtil: new LocalStorageUtil()
      }
    });

    after(() => {
      sandbox.restore();
    });

    it('filter media elements by properties', () => {
      const mainController = new MainController('', util);

      const a = testData[0];
      const b = testData[1];

      console.log(a.id, b.id)

      assert.equal(mainController.customSort(a, b), -1, 'Ascending title');
      assert.equal(mainController.customSort(a, b), 1, 'Descending title');
      assert.equal(mainController.customSort(a, b), -1, 'Descending id');
      assert.equal(mainController.customSort(a, b), 0, 'Ascending description (equal)');
      assert.equal(mainController.customSort(a, b), 1, 'Ascending location.country');
    });
  });
});
