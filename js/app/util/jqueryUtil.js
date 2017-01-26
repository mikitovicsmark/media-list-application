export class JqueryUtil {
  clearVideoContainer() {
    $('#video-container').empty();
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
    const element = $(`#video-${id} > div > div`);
    if (element.hasClass('turned')) {
      element.removeClass('turned');
    } else {
      element.addClass('turned');
    }
  }
}
