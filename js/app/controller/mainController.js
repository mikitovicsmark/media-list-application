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
      title: value.title || 'No title',
      description: value.description || '',
      viewers: value.viewers || 0,
      picture: value.picture || '',
      location: value.location || { country: '', city: '', coordinates: { latitude: '', longitude: '' }},
      labels: value.labels || []
    }

    // main video wrapper distinguished with ID
    const elementId = `video-${checkedValue.id}`;

    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    this.jqueryUtil.appendTo('#video-container', `<div class="media-item" id="${elementId}"/>`);

    // watchlist add or remove button
    let watchlistButton = '';
    if (this.localStorageUtil.isInWatchlist(checkedValue.id)) {
      watchlistButton = `<div class="watchlist-toggle" onclick="ctrl.removeFromWatchlist(${checkedValue.id})">&#9733;</div>`;
    } else {
      watchlistButton = `<div class="watchlist-toggle" onclick="ctrl.addToWatchlist(${checkedValue.id})">&#9734;</div>`;
    }

    // creating the html components for one object
    const mediaTemplate = `
      <div class="media-container">
        <div class="media-card">
          <div class="card front">
            <div class="image-wrapper">
              <img class="video-image" src="${checkedValue.picture}"/>
              ${watchlistButton}
            </div>
            <div class="video-title"> ${checkedValue.title} </div>    
            <div class="video-labels">${checkedValue.labels} </div>  
            <div class="video-details">${checkedValue.viewers} viewers</div>
            <div class="video-details">From: ${checkedValue.location.country} - ${checkedValue.location.city} </div>
            <div class="video-details">lat: ${checkedValue.location.coordinates.latitude} lng: ${checkedValue.location.coordinates.longitude}</div>
            <div class="video-description" onclick="ctrl.toggleDetail(${checkedValue.id})">&#9899; &#9899; &#9899;</div>
          </div>
          <div class="card back" onmouseleave="ctrl.toggleDetail(${checkedValue.id})">
            <p>${checkedValue.description}</p>
          </div>
        </div>
      </div>
      `;
    this.jqueryUtil.appendTo(`#${elementId}`, mediaTemplate);
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

  restartPoll() {
    window.model.pollData();
  }

  toggleDetail(id) {
    this.jqueryUtil.toggleDetail(id);
  }

}
