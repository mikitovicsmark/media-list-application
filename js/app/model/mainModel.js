class MainModel {
  constructor() {
    this.getData();
  }

  getData() {
    window.$.ajax({
      url: "http://146.185.158.18/fake_api.php",
      dataType: "jsonp",
      success: this.getDataSuccess.bind(this),
      error: this.getDataError.bind(this)
    });
  }

  getDataSuccess(response) {
    const sorted = response.sort(this.customSort)
    $.each(sorted, (index, val) => {
      this.createVideoElement(index, val);
    });
  }

  getDataError(error) {
    alert("Could not retrieve media list.");
  }

  createVideoElement(index, value) {
    // main video wrapper distinguished with ID
    const elementId = `video-${value.id}`;

    $('#video-container').append(`<div id="${elementId}"/>`);

    // creating the html components for one object
    $(`#${elementId}`).append(`
      <div class="video-title"> ${value.title} </div>
      <img class="video-image" src="${value.picture}"/>
      <div class="video-title">Viewers:  ${value.viewers} </div>
      <div class="video-title"> ${value.description} </div>
      <div class="video-title">Location: ${value.location.country} - ${value.location.city} </div>
      `);
    $('#video-container').append($('<hr/>'));
  }

  customSort(a, b) {
    const property = $("#filter-value").val();
    if (a[property] == b[property]) { return 0; }
    return (a[property] > b[property]) ? 1 : -1;
  }

  keksimus() {
    console.log('keksimus')
  }
}

export default MainModel;
