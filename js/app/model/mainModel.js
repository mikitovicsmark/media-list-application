define(['jquery'], ($) => {
  class MainModel {
    constructor() {
      this.getData();
    }

    getData() {
      $.ajax({
        url: "http://146.185.158.18/fake_api.php",
        dataType: "jsonp",
        success: this.getDataSuccess.bind(this),
        error: this.getDataError.bind(this)
      });
    }

    getDataSuccess(response) {
      $.each(response, (index, val) => {
        this.createVideoElement(index, val);
      });
    }

    getDataError(error) {
      console.log(error);
    }

    createVideoElement(index, value) {
      let elementId = `video-${value.id}`;
      $('#video-container').append(`<div id="${elementId}"/>`);
      $(`#${elementId}`).append(`<div class="video-title"> ${value.title} </div>`);
      $(`#${elementId}`).append(`<img class="video-image" src="${value.picture}"/>`);
      $('#video-container').append($('<hr/>'));
    }

  }

  return new MainModel;
});
