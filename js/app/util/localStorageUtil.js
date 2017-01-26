export class LocalStorageUtil {
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
  }

  removeFromWatchlist(id) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist'));
    const index = watchlist.indexOf(id)
    if(index > -1) {
      watchlist.splice(index, 1);
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }

  // check if localstorage.watchlist is null
  initLocalstorage() {
    if (!localStorage.getItem("watchlist")) {
      const watchlist = [];
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  }

  // delete items from watchlist, if not present in API data
  filterWatchlist(data) {
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

  getWatchlist() {
    return JSON.parse(localStorage.getItem('watchlist'));
  }
}
