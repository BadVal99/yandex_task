// $(function () {
//
//   var myMap, myGeoObject;
//
// // Дождёмся загрузки API и готовности DOM.
//   ymaps.ready(init);
//
//   function init() {
//     var data = {
//       "type": "FeatureCollection",
//       "features": [
//         {"id": 0, "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]}},
//         {"id": 1, "geometry": {"type": "Point", "coordinates": [55.763338, 37.565466]}}
//       ]
//     };
//
//     var myMap = new ymaps.Map('map', {
//         center: [55.76, 37.64],
//         zoom: 10
//       }, {
//         searchControlProvider: 'yandex#search'
//       }),
//       objectManager = new ymaps.ObjectManager({
//         // Чтобы метки начали кластеризоваться, выставляем опцию.
//         clusterize: true,
//         // ObjectManager принимает те же опции, что и кластеризатор.
//         gridSize: 32,
//         clusterDisableClickZoom: true
//       });
//
//     // Чтобы задать опции одиночным объектам и кластерам,
//     // обратимся к дочерним коллекциям ObjectManager.
//     objectManager.objects.options.set('preset', 'islands#greenDotIcon');
//     objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
//     myMap.geoObjects.add(objectManager);
//
//     objectManager.add(data);
//   }
//
//   var yellowCoords = {
//     // Описание геометрии.
//     geometry: {
//       type: "Point",
//       coordinates: [55.73, 37.75]
//     },
//     // Свойства.
//     properties: {
//       // Контент метки.
//       iconContent: 'Я',
//       hintContent: 'Ну давай уже тащи'
//     }
//   };
//
//   // window.addEventListener("keypress", function (e) {
//   //   if (e.keyCode !== 13) return;
//   //   $('.js-btn').trigger('click');
//   //   init()
//   // });
//
//
// });
