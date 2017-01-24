import { MainController } from 'app/controller/mainController';
import { MainModel } from 'app/model/mainModel';

import { JqueryUtil } from 'app/util/jqueryUtil';
import { LocalStorageUtil } from 'app/util/localStorageUtil';

import $ from 'jquery';
import jQuery from 'jquery';

class MainClass {
  constructor() {
    const utils = {
      jqueryUtil: new JqueryUtil(),
      localStorageUtil: new LocalStorageUtil()
    }
    window.model = new MainModel(utils.jqueryUtil);
    window.model.getData().then((data) => {
      window.ctrl = new MainController(data, utils);
      window.model.pollData();
    });
  }
}

new MainClass;
