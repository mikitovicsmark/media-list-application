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
    return $("#filter-value").val();
  }

  getSortDirection() {
    return ($("#filter-direction").val() === 'asc') ? 1 : -1;
  }
}