export class JqueryUtil {
  clearContainer(container) {
    $(`#${container}`).empty();
  }

  getRadioValue() {
    return $('input[name=filter-radio]:checked').val();
  }

  appendTo(parent, child) {
    $(parent).append(child);
  }

  getFilterProperty() {
    return $('#filter-value').val();
  }

  getSortDirection() {
    return ($('#filter-direction').val() === 'asc') ? 1 : -1;
  }

  getPollingInverval() {
    return $('#polling-interval').val();
  }

  toggleDetail(id) {
    const card = $(`#video-${id} > div > div`);
    card.toggleClass('turned');
  }

  updateWatchlist(labelArray) {
    this.clearContainer('watchlist');
    if (labelArray.length === 0) {
      this.appendTo('#watchlist', `<li>Empty list</li>`);
    } else {
      const labels = labelArray.sort();
      labels.forEach((label) => {
        this.appendTo('#watchlist', `<li>${label}</li>`);
      });
    }
  }
}
