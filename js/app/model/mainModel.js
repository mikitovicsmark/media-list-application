class MainModel {
  constructor() {
    this.data = [];
  }

  getData() {
    return new Promise((resolve, reject) => {
      window.$.ajax({
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
}

export default MainModel;
