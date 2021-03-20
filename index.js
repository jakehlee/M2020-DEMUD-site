async function get_demud() {
    return fetch('M2020_demud.json')
            .then(response => response.json());
}

function updateTable(page) {
    console.log(page)
    var T = document.getElementById('gallery');
    var cellArray = Array.from(T.querySelectorAll('.cell'));
    var linkRoot = "https://mars.nasa.gov/mars2020/multimedia/raw-images/"

    get_demud()
        .then(data =>
            cellArray.map(function(cel, idx) {
                cel.innerHTML = '<a href="'+linkRoot+data[(page-1)*25+idx][0]+'"><img class="m2020-img" src="'+data[(page-1)*25+idx][1]+'"></a>'
            })
        )

};


$(document).ready(function(){

    for (i=1; i<=20; i++) {
        $('#pagination').append('<li class="page-item" id="page-'+i+'"><a class="page-link" href="#">'+i+'</a></li>')
    }

    $('#page-1').addClass('active')

    for (i=1; i<=20; i++) { (
        function(j) {
            $('#page-'+i).click(function(){
                $('.page-item').removeClass('active');
                $(this).addClass('active');
                updateTable(j);
            });
        }(i));
    }

    updateTable(1);

});
