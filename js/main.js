mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyb2xwb3MiLCJhIjoiQ01qN3dEWSJ9.Vgyz5uVSv3sw9QgPqdPTtA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/carolpos/cj29jqouu00192tpe0a3jjrmm',
    center: [-46.631,-23.604],
    zoom: 10,
    maxBounds: [
        [-48.000,-24.500], // Southwest coordinates
        [-42.300,-22.000]  // Northeast coordinates
    ]
});

// disable map zoom when using scroll
map.scrollZoom.disable();
map.dragPan.disable();

var flyToParams = {
    'sao-paulo': {
        center: [-46.631,-23.604],
        zoom: 10
    },
    'rio-janeiro': {
        center: [-43.218,-22.863],
        zoom: 10
    },
}

var layers = {
    superior: ['pontos-superior', 'pontos-superior-rj'],
    medio: ['pontos-medio', 'pontos-medio-rj'],
    fundamental: ['pontos-fundamental', 'pontos-fundamental-rj'],
    incompleto: ['pontos-incompleto', 'pontos-incompleto-rj']
}

var layerStatuses = {
    superior: true,
    medio: true,
    fundamental: true,
    incompleto: true,
}

function toggleLayer(layerName) {
    $.each(layers[layerName], function( index, value ) {
        var visibility = map.getLayoutProperty(value, 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty(value, 'visibility', 'none');
        } else {
            map.setLayoutProperty(value, 'visibility', 'visible');
        }
    });
}

function showLayer(layerName) {
    $.each(layers[layerName], function( index, value ) {
        map.setLayoutProperty(value, 'visibility', 'visible');
    });
}
function hideLayer(layerName) {
    $.each(layers[layerName], function( index, value ) {
        map.setLayoutProperty(value, 'visibility', 'none');
    });
}

// FlyTo
keyboardJS.bind('r', function(e) {
  map.flyTo(flyToParams['rio-janeiro']);
});
keyboardJS.bind('s', function(e) {
  map.flyTo(flyToParams['sao-paulo']);
});

// Layer events
keyboardJS.bind('1', function(e) {
  showLayer('superior');
});
keyboardJS.bind('2', function(e) {
  showLayer('medio');
});
keyboardJS.bind('3', function(e) {
  showLayer('fundamental');
});
keyboardJS.bind('4', function(e) {
  showLayer('incompleto');
});
keyboardJS.bind('5', function(e) {
  hideLayer('superior');
});
keyboardJS.bind('6', function(e) {
  hideLayer('medio');
});
keyboardJS.bind('7', function(e) {
  hideLayer('fundamental');
});
keyboardJS.bind('8', function(e) {
  hideLayer('incompleto');
});

var joystickSpeed = 2;

// Joystick navigation
keyboardJS.bind('h', function(e) {
  map.panBy([-1 * joystickSpeed, 0], { animate: false });
});
keyboardJS.bind('l', function(e) {
  map.panBy([1 * joystickSpeed, 0], { animate: false });

});
keyboardJS.bind('j', function(e) {
  map.panBy([0, 1 * joystickSpeed], { animate: false });

});
keyboardJS.bind('k', function(e) {
  map.panBy([0, -1 * joystickSpeed], { animate: false });
});

// Custom Zoom
keyboardJS.bind('z', function(e) {
  map.zoomIn({ animate: false });
});
keyboardJS.bind('x', function(e) {
  map.zoomOut({ animate: false });
});

// Pan using mouse wheel
map.getContainer().addEventListener('wheel', onWheel, false);

function onWheel(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    map.panBy(
        [
            (event.deltaX * 1) / 1, // Divide by -1 for inverted axis
            (event.deltaY * 1) / 1
        ],
        { animate: false }
    );
}
