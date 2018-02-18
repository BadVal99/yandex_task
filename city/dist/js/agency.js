var myMap1,
    myMap2,
    myPlacemark1,
    myPlacemark2,
    longitude1, latitude1, result1,
    longitude2, latitude2, result2,
    nameBlr;


latitude1 = 53.901980383943545;
longitude1 = 27.561096954341615;

latitude2 = 53.901980383943545;
longitude2 = 27.561096954341615;


/********************** обработчик изменения координат ********************************/

function addressWatcher(var_lat, var_long, var_result, modalWindow, var_map, var_placeMark) {

    var address;


    $('#town, #add-town, #street, #add-street, #buildingNumberEdit, #buildingNumber').on('input keyup keypress', function () {
        if ($('.town', modalWindow).val() !== '') {
            address = ['Беларусь', $('.town', modalWindow).val(), $('.street', modalWindow).val(), $('.buildingNumber', modalWindow).val() + ' к' + $('.buildingSecondnumber', modalWindow).val()].join(', ');

            var myGeocoder = ymaps.geocode(address, {
                results: 1
            });
            myGeocoder.then(
                function (res) {
                    var_result = res.geoObjects.get(0).geometry.getCoordinates();

                    //обновляем координаты метки
                    var_placeMark.geometry.setCoordinates(var_result);

                    var_map.setCenter(var_result, 16, {
                        checkZoomRange: true,
                        duration: 1000
                    });
                    var_map.setCenter(var_result);

                    $('.latitude', modalWindow).val(var_result[0]);
                    $('.longitude', modalWindow).val(var_result[1]);

                }
            );
        }
    })
}


function mapAtStart(var_lat, var_long, var_result, modalWindow, var_map, var_placeMark) {


    addressWatcher(var_lat, var_long, var_result, modalWindow, var_map, var_placeMark);

    if (modalWindow === "#editManageDepartment") {

        if ($('.town', modalWindow).val() !== '') {

            var_lat = $('.latitude', '#editManageDepartment').val();
            var_long = $('.longitude', '#editManageDepartment').val();

            var coordinates = [var_lat, var_long];

            //обновляем координаты метки
            var_placeMark.geometry.setCoordinates(coordinates);
            var_map.setCenter(coordinates, 16, {
                checkZoomRange: true,
                duration: 1000
            });
        }
    }
}


/**************************** инициализация яндекс карт ***************************/
function init() {

    myMap1 = new ymaps.Map("add-map", {
        center: [latitude1, longitude1],
        zoom: 14
    });

    myMap2 = new ymaps.Map("map", {
        center: [longitude2, latitude2],
        zoom: 14
    });


    myPlacemark1 = new ymaps.Placemark([latitude1, longitude1], {}, {draggable: true});

    myPlacemark2 = new ymaps.Placemark([longitude2, latitude2], {}, {draggable: true});


    myMap1.geoObjects.add(myPlacemark1);

    myMap2.geoObjects.add(myPlacemark2);


    myPlacemark1.events.add('dragend', function () {
        var coords = myPlacemark1.geometry.getCoordinates();
        $('.latitude', '#addManageDepartment').val(coords[0]);
        $('.longitude', '#addManageDepartment').val(coords[1]);
    });

    myPlacemark2.events.add('dragend', function () {
        var coords = myPlacemark2.geometry.getCoordinates();
        $('.latitude', '#editManageDepartment').val(coords[0]);
        $('.longitude', '#editManageDepartment').val(coords[1]);
    });
}

ymaps.ready(init);


//пример кластеризации

function init () {

    var myMap = new ymaps.Map("map", {center: [56.316667, 44.0],zoom: 11});

    myMap.controls.add("zoomControl")
        .add("typeSelector")
        .add("mapTools");

    myGeoObjects = [];

    $.getJSON("http://webmap-blog.ru/examples/clusterer/aztek-yaclusterer/vivmarkers.php", function(json){
        if (json.status == 'OK') {
            for (i = 0; i < json.markers.length; i++) {
                myPlacemark = new ymaps.Placemark([json.markers[i].lon, json.markers[i].lat], {

                    balloonContentHeader: '<div style="color:#ff0303;font-weight:bold">'+json.markers[i].cname+'</div>',
                    balloonContentBody: '<strong>Адрес:</strong> '+json.markers[i].address,
                });
                myGeoObjects.push(myPlacemark);
            }
            clusterer = new ymaps.Clusterer();
            clusterer.add(myGeoObjects);
            myMap.geoObjects.add(clusterer);
        }
        else
        {
            alert('Произошла ошибка!');
        }
    })

}

//redraw
myMap.container.fitToViewport();