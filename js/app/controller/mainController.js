export class MainController {
  constructor(data) {
    this.data = data || [];
    this.initLocalstorage();
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

    // watchlist add or remove button
    let watchlistButton = '';
    if (this.isInWatchlist(checkedValue.id)) {
      watchlistButton = `<button onclick="ctrl.removeFromWatchlist(${checkedValue.id})">Remove from watchlist &#10007;</button>`;
    } else {
      watchlistButton = `<button onclick="ctrl.addToWatchlist(${checkedValue.id})">Add to watchlist &#9733;</button>`;
    }

    // creating the html components for one object
    $(`#${elementId}`).append(`
      <div class="video-title"> ${checkedValue.title} </div>
      <img class="video-image" src="${checkedValue.picture}"/>
      <div class="video-title">Viewers:  ${checkedValue.viewers} </div>
      <div class="video-title"> ${checkedValue.description} </div>
      <div class="video-title">Location: ${checkedValue.location.country} - ${checkedValue.location.city} </div>
      ${watchlistButton}
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
    this.filterWatchList(this.data);
    this.updateList();
  }

  isInWatchlist(id) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist'));
    const index = watchlist.indexOf(id)
    return index > -1;
  }

  addToWatchlist(id) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist'));
    if (watchlist.indexOf(id) === -1) {
      watchlist.push(id);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
    this.updateList();
  }

  removeFromWatchlist(id) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist'));
    const index = watchlist.indexOf(id)
    if(index > -1) {
      watchlist.splice(index, 1);
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    this.updateList();
  }

  // check if localstorage.watchlist is null
  initLocalstorage() {
    if (!localStorage.getItem("watchlist")) {
      const watchlist = [];
      watchlist.push(JSON.parse(localStorage.getItem('watchlist')));
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  }

  // delete items from watchlist, if not present in API data
  filterWatchList(data) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist'));
    const dataIdArray = [];
    data.forEach((mediaItem) => {
      dataIdArray.push(mediaItem.id);
    })
    const filteredWatchlist = watchlist.filter((id) => {
      return dataIdArray.indexOf(id) != -1;
    });
    localStorage.setItem('watchlist', JSON.stringify(filteredWatchlist));
  }

}
