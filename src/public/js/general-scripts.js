const $_ = function (id) { return document.getElementById(id); };
const $$_ = function (className) { return document.getElementsByClassName(className); };

$('.dataTable').DataTable({
    'paging': true,
    'lengthChange': false,
    'searching': true,
    'ordering': false,
    'info': true,
    'autoWidth': false,
    'pageLength': 30
});

let axiosGetCall = async (url, params) => {
    loaderOn();
    let response = await axios.get(url, { params: params });
    loaderOff();

    if (response.status == 200)
        return response.data;
    else return null;
}

let axiosPostCall = async (url, params) => {
    loaderOn();
    let response = await axios.post(url, params, { headers: { 'Content-Type': 'application/json' } });
    loaderOff();

    if (response.status == 200)
        return response.data;
    else return null;
}

let uploadFile = async elementId => {
    let form = new FormData();
    form.append('file', $_(elementId).files[0]);
    let response = await axios.post('/upload-file', form);

    if (response.status == 200)
        return response.data;

    else return null;
}

let loaderOn = () => { $_('loader').style.display = "block"; }
let loaderOff = () => { $_('loader').style.display = "none"; }