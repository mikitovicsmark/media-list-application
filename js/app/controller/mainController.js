export class MainController {
  constructor(data, utils) {
    this.jqueryUtil = utils.jqueryUtil;
    this.localStorageUtil = utils.localStorageUtil;
    this.data = data || [];
    this.localStorageUtil.initLocalstorage();
    this.updateList();
  }

  updateList() {
    this.jqueryUtil.clearVideoContainer();
    const radioIndex = this.jqueryUtil.getRadioValue();
    const sorted = this.data.sort(this.customSort.bind(this))
    sorted.forEach((val) => {
      //filtering based on type / live attribute
      switch(radioIndex) {
        case 'live':
          if(val.isLive && val.type === 'channel') {
            this.createVideoElement(val);
          }
          break;
        case 'offline':
          if(!val.isLive && val.type === 'channel') {
            this.createVideoElement(val);
          }
          break;
        case 'video':
          if(val.type === 'recorded') {
            this.createVideoElement(val);
          }
          break;
        default:
          this.createVideoElement(val);
      }
    });
  }

  createVideoElement(value) {
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
    this.jqueryUtil.appendTo('#video-container', `<div id="${elementId}"/>`);

    // watchlist add or remove button
    let watchlistButton = '';
    if (this.localStorageUtil.isInWatchlist(checkedValue.id)) {
      watchlistButton = `<button onclick="ctrl.removeFromWatchlist(${checkedValue.id})">Remove from watchlist &#10007;</button>`;
    } else {
      watchlistButton = `<button onclick="ctrl.addToWatchlist(${checkedValue.id})">Add to watchlist &#9733;</button>`;
    }

    // creating the html components for one object
    const mediaTemplate = `
      <div class="video-title"> ${checkedValue.title} </div>
      <img class="video-image" src="${checkedValue.picture}"/>
      <div class="video-title">Viewers:  ${checkedValue.viewers} </div>
      <div class="video-title"> ${checkedValue.description} </div>
      <div class="video-title">Location: ${checkedValue.location.country} - ${checkedValue.location.city} </div>
      ${watchlistButton}
      `;
    this.jqueryUtil.appendTo(`#${elementId}`, mediaTemplate);
    this.jqueryUtil.appendTo('#video-container', '<hr/>');
  }

  // filtering based on properties
  customSort(a, b) {
    const property = this.jqueryUtil.getFilterProperty();

    // changing between ascending and descending
    const dir = this.jqueryUtil.getSortDirection();

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
    this.localStorageUtil.filterWatchList(this.data);
    this.updateList();
  }

  addToWatchlist(id) {
    this.localStorageUtil.addToWatchlist(id);
    this.updateList();
  }

  removeFromWatchlist(id) {
    this.localStorageUtil.removeFromWatchlist(id);
    this.updateList();
  }

}
