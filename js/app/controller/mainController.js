class MainController {
  constructor(data) {
    this.data = data || [];
    this.updateList();
  }

  updateList() {
    $('#video-container').empty();
    const radioIndex = parseInt($('input[name=filter-radio]:checked').val());
    const sorted = this.data.sort(this.customSort)
    $.each(sorted, (index, val) => {
      //filtering based on type / live attribute
      switch(radioIndex) {
        case 1:
          if(val.isLive && val.type === 'channel') {
            this.createVideoElement(index, val);
          }
          break;
        case 2:
          if(!val.isLive && val.type === 'channel') {
            this.createVideoElement(index, val);
          }
          break;
        case 3:
          if(val.type === 'recorded') {
            this.createVideoElement(index, val);
          }
          break;
        default:
          this.createVideoElement(index, val);
      }
    });
  }

  createVideoElement(index, value) {
    const checkedValue = {
      id: value.id || 0,
      type: value.type || '',
      isLive: value.isLive || false,
      title: value.title || '',
      description: value.description || '',
      viewers: value.viewers || 0,
      picture: value.picture || '',
      location: value.location || { country: '', city: '', coordinates: { latitude: '', longitude: '' }},
      labels: value.labels || []
    }
    // main video wrapper distinguished with ID
    const elementId = `video-${checkedValue.id}`;
    $('#video-container').append(`<div id="${elementId}"/>`);

    // creating the html components for one object
    $(`#${elementId}`).append(`
      <div class="video-title"> ${checkedValue.title} </div>
      <img class="video-image" src="${checkedValue.picture}"/>
      <div class="video-title">Viewers:  ${checkedValue.viewers} </div>
      <div class="video-title"> ${checkedValue.description} </div>
      <div class="video-title">Location: ${checkedValue.location.country} - ${checkedValue.location.city} </div>
      `);
    $('#video-container').append($('<hr/>'));
  }

  // filtering based on properties
  customSort(a, b) {
    const property = $("#filter-value").val();

    // changing between ascending and descending
    const dir = ($("#filter-direction").val() === 'asc') ? 1 : -1;

    // might be a property of an object
    const dotIndex = property.indexOf('.');
    if (dotIndex > -1) {
      const ancestorProp = property.substr(0, dotIndex);
      const childProp = property.substr(dotIndex + 1, property.length);
      if (a[ancestorProp][childProp] === b[ancestorProp][childProp]) { return 0; }
      return (a[ancestorProp][childProp] > b[ancestorProp][childProp]) ? dir : -dir;
    }

    // simple property comparing
    if (a[property] === b[property]) { return 0; }
    return (a[property] > b[property]) ? dir : -dir;
  }

  setData(data) {
    this.data = data;
    this.updateList();
  }
}

export default MainController;
