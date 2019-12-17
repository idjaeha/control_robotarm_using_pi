function sendValue() {
    var value = document.getElementById('slider_range');
    var slidebar_view = document.getElementById('slider_value_view');
    slidebar_view.value = value;
    var form = document.getElementById('robotarmdata');
    form.submit();
}