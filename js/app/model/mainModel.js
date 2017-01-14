define(['jquery'], ($) => {
  class MainModel {
    constructor() {
      this.getData();
    }

    getData() {
      $.ajax({
        url: "http://146.185.158.18/fake_api.php",
        dataType: "jsonp",
        success: function(response) {
          console.log(response);
          $.each(response, (index, val) => {
            let elementId = `video-${val.id}`;
            $('#video-container').append($('<div/>').attr('id', elementId));
            $(`#${elementId}`).text(JSON.stringify(val));
            $('#video-container').append($('<hr/>'));
          });
        },
        error: function() {
          console.log("something went wrong");
        }
      });
    }
  }

  return new MainModel;
});
