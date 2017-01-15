import MainController from 'app/controller/mainController';
import MainModel from 'app/model/mainModel';
import $ from 'jquery';
import jQuery from 'jquery';

class MainClass {
  constructor() {
    window.model = new MainModel;
    window.model.getData().then((data) => {
      window.ctrl = new MainController(data);
    });
  }
}

new MainClass;
