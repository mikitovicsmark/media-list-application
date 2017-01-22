export class MainModel {
  constructor() {
    this.data = [];
    this.pollData();
  }

  getData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://146.185.158.18/fake_api.php",
        dataType: "jsonp",
        success: (response) => {
          this.data = response;
          return resolve(this.data);
        },
        error: (err) => {
          alert("Could not retrieve media list.");
          reject(err);
        }
      });
    });
  }

  pollData() {
    this.interval = this.getPollingInverval();
    clearTimeout(this.polling);
    this.polling = setTimeout($.proxy(this.pollData, this), this.interval);
    this.getData().then((data) => {
      if (window.ctrl) {
        window.ctrl.setData(data);
      }
    });
  }

  getPollingInverval() {
    return $("#polling-interval").val();
  }
}
