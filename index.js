var instrumentIDs = ['ALL', 'NLF', 'NRF', 'FLF', 'FRF', 'RLF', 'RRF', 'ZLF', 'ZRF', 'WSM', 'SIF', 'EAF', 'EBF', 'ESF', 'EUF', 'EDF', 'ELM'];
var instrumentNames = [
    'All Images',
    'Navigation Camera - Left',
    'Navigation Camera - Right',
    'Front Hazcam - Left',
    'Front Hazcam - Right',
    'Rear Hazcam - Left',
    'Rear Hazcam - Right',
    'Mastcam-Z - Left',
    'Mastcam-Z - Right',
    'MEDA SkyCam',
    'SHERLOC-WATSON',
    'Parachute Up-Look Camera A',
    'Parachute Up-Look Camera B',
    'Descent Stage Down-Look Camera',
    'Rover Up-Look Camera',
    'Rover Down-Look Camera',
    'Lander Vision System Camera'
];

async function get_demud(id) {
    return fetch('demud_output/'+id+'_demud.json')
            .then(response => response.json());
}

function updateTable(page, id) {
    var T = document.getElementById('gallery');
    var cellArray = Array.from(T.querySelectorAll('.cell'));
    var linkRoot = "https://mars.nasa.gov/mars2020/multimedia/raw-images/";
    get_demud(id)
        .then(data =>
            cellArray.map(function(cel, idx) {
                dataIdx = (page-1)*25+idx;
                if (dataIdx < data.length) {
                    cel.innerHTML = '<a href="'+linkRoot+data[dataIdx][0]+'" target="_blank"><img class="m2020-img" src="'+data[(page-1)*25+idx][1]+'"></a>';
                } else {
                    cel.innerHTML = '<p class="text-center">N/A</p>';
                }
            })
        );

}

function updateNav(id) {
    for (i=1; i<=20; i++) { (
        function(j) {
            $('#page-'+i).unbind('click');
            $('#page-'+i).click(function(){
                $('.page-item').removeClass('active');
                $(this).addClass('active');
                updateTable(j, id);
            });
        }(i));
    }
    $('.page-item').removeClass('active');
    $('#page-1').addClass('active');
}


$(document).ready(function(){

    for (i=1; i<=20; i++) {
        $('#pagination').append('<li class="page-item" id="page-'+i+'"><a class="page-link" href="#a">'+i+'</a></li>');
    }

    for (i=0; i < instrumentIDs.length; i++) {
        let id = instrumentIDs[i];
        let name = instrumentNames[i];
        $('#instrument-form-group').append('<div class="form-check"><input type="radio" class="form-check-input" name="instrument" id="'+id+'" value="'+id+'"><label for="'+id+'" class="form-check-label">'+name+'</label></div>');
    }

    $('#ALL').prop('checked', true);

    $('#update-instrument').click(function(){
        let id = $('input[name=instrument]:checked', '#instrument-form').val()
        updateNav(id);
        updateTable(1, id);
    })

    updateNav('ALL')
    updateTable(1, 'ALL');

});
