//import { DATAFILES } from './config';
//import { getJSON } from './getData.js';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import MultiPoint from 'ol/geom/MultiPoint';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

const DATA_SOURCE = 'https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/';
DATAFILES = {
    EPIDEMICSTATUS: `${DATA_SOURCE}/covid19-epidemic-status.json`,
    PCR: `${DATA_SOURCE}/covid19-pcr.json`,
    DECEASEDPEOPLECOUNT: `${DATA_SOURCE}/covid19-deceasedPeopleCount.json`,
    BYAGE: `${DATA_SOURCE}/covid19-byage.json`,
    BYHEALTHZONE: `${DATA_SOURCE}/covid19-byhealthzone.json`,
    BYMUNICIPALITY: `${DATA_SOURCE}/covid19-bymunicipality.json`,
    BYHOSPITAL: `${DATA_SOURCE}/covid19-byhospital.json`,
};
var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};
window.onload = function () {
    /*
    getJSON('https://opendata.euskadi.eus/w79-catalogo/es/contenidos/ds_geograficos/md_ideeu_lim_administrativos/opendata/municipios_epsg3857.json', function (err, dataJson) {
        if (err != null) {
            alert('Something went wrong: ' + err);
        } else {
*/
    /*
        var map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            target: 'map',
            view: new ol.View({
                center: ol.proj.fromLonLat([42.41, 5.82]),
                zoom: 4
            })
        });
        map.addControl(new ol.control.ZoomSlider());
    
    */

    var image = new CircleStyle({
        radius: 5,
        fill: null,
        stroke: new Stroke({ color: 'red', width: 1 })
    });

    var styles = {
        'Point': new Style({
            image: image
        }),
        'LineString': new Style({
            stroke: new Stroke({
                color: 'green',
                width: 1
            })
        }),
        'MultiLineString': new Style({
            stroke: new Stroke({
                color: 'green',
                width: 1
            })
        }),
        'MultiPoint': new Style({
            image: image
        }),
        'MultiPolygon': new Style({
            stroke: new Stroke({
                color: 'yellow',
                width: 1
            }),
            fill: new Fill({
                color: 'rgba(255, 255, 0, 0.1)'
            })
        }),
        'Polygon': new Style({
            stroke: new Stroke({
                color: 'blue',
                lineDash: [4],
                width: 3
            }),
            fill: new Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            })
        }),
        'GeometryCollection': new Style({
            stroke: new Stroke({
                color: 'magenta',
                width: 2
            }),
            fill: new Fill({
                color: 'magenta'
            }),
            image: new CircleStyle({
                radius: 10,
                fill: null,
                stroke: new Stroke({
                    color: 'magenta'
                })
            })
        }),
        'Circle': new Style({
            stroke: new Stroke({
                color: 'red',
                width: 2
            }),
            fill: new Fill({
                color: 'rgba(255,0,0,0.2)'
            })
        })
    };

    var styleFunction = function (feature) {
        return styles[feature.getGeometry().getType()];
    };

    var geojsonObject = {
        'type': 'FeatureCollection',
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:3857'
            }
        },
        'features': [{
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [0, 0]
            }
        }, {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': [[4e6, -2e6], [8e6, 2e6]]
            }
        }, {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': [[4e6, 2e6], [8e6, -2e6]]
            }
        }, {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [[[-5e6, -1e6], [-4e6, 1e6], [-3e6, -1e6]]]
            }
        }, {
            'type': 'Feature',
            'geometry': {
                'type': 'MultiLineString',
                'coordinates': [
                    [[-1e6, -7.5e5], [-1e6, 7.5e5]],
                    [[1e6, -7.5e5], [1e6, 7.5e5]],
                    [[-7.5e5, -1e6], [7.5e5, -1e6]],
                    [[-7.5e5, 1e6], [7.5e5, 1e6]]
                ]
            }
        }, {
            'type': 'Feature',
            'geometry': {
                'type': 'MultiPolygon',
                'coordinates': [
                    [[[-5e6, 6e6], [-5e6, 8e6], [-3e6, 8e6], [-3e6, 6e6]]],
                    [[[-2e6, 6e6], [-2e6, 8e6], [0, 8e6], [0, 6e6]]],
                    [[[1e6, 6e6], [1e6, 8e6], [3e6, 8e6], [3e6, 6e6]]]
                ]
            }
        }, {
            'type': 'Feature',
            'geometry': {
                'type': 'GeometryCollection',
                'geometries': [{
                    'type': 'LineString',
                    'coordinates': [[-5e6, -5e6], [0, -5e6]]
                }, {
                    'type': 'Point',
                    'coordinates': [4e6, -5e6]
                }, {
                    'type': 'Polygon',
                    'coordinates': [[[1e6, -6e6], [2e6, -4e6], [3e6, -6e6]]]
                }]
            }
        }]
    };

    var vectorSource = new VectorSource({
        features: (new GeoJSON()).readFeatures(geojsonObject)
    });

    vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

    var vectorLayer = new VectorLayer({
        source: vectorSource,
        style: styleFunction
    });

    var map = new Map({
        layers: [
            new TileLayer({
                source: new OSM()
            }),
            vectorLayer
        ],
        target: 'map',
        view: new View({
            center: [0, 0],
            zoom: 2
        })
    });

    //}
    //});
}