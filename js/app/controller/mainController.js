class MainController {
  constructor(data) {
    this.data = data || [];
    this.updateList();
  }

  updateList() {
    $('#video-container').empty();
    const sorted = this.data.sort(this.customSort)
    $.each(sorted, (index, val) => {
      this.createVideoElement(index, val);
    });
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
    const dotIndex = property.indexOf('.');

    // might be an object
    if (dotIndex > -1) {
      const ancestorProp = property.substr(0, dotIndex);
      const childProp = property.substr(dotIndex + 1, property.length);
      if (a[ancestorProp][childProp] === b[ancestorProp][childProp]) { return 0; }
      return (a[ancestorProp][childProp] > b[ancestorProp][childProp]) ? 1 : -1;
    }

    // simple property comparing
    if (a[property] === b[property]) { return 0; }
    return (a[property] > b[property]) ? 1 : -1;
  }

  setData(data) {
    this.data = data;
  }
}

export default MainController;
