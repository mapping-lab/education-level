mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyb2xwb3MiLCJhIjoiQ01qN3dEWSJ9.Vgyz5uVSv3sw9QgPqdPTtA';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/carolpos/cj29jqouu00192tpe0a3jjrmm',
        center: [-46.631,-23.604],
        zoom: 10,
        minZoom: 9,
        maxZoom: 15,
    });

map.addControl(new mapboxgl.NavigationControl());

var layers = {
    superior: ['pontos-superior', 'pontos-superior-rj'],
    medio: ['pontos-medio', 'pontos-medio-rj'],
    fundamental: ['pontos-fundamental', 'pontos-fundamental-rj'],
    incompleto: ['pontos-incompleto', 'pontos-incompleto-rj']
}


$(document).ready(function(){
    $('.legend-container > li').click(function() {
        var layerName = $(this).data('layer');
        var element = $(this);

        $.each(layers[layerName], function( index, value ) {

            var visibility = map.getLayoutProperty(value, 'visibility');
            if (visibility === 'visible') {
                element.removeClass('active');
                map.setLayoutProperty(value, 'visibility', 'none');
            } else {
                element.addClass('active');
                map.setLayoutProperty(value, 'visibility', 'visible');
            }
        });

    });

    $('.city-container > li').click(function() {

        if ($(this).hasClass('rio-janeiro')) {
            map.flyTo({center: [-43.218,-22.863]});
        } else if ($(this).hasClass('sao-paulo')) {
            map.flyTo({center: [-46.631,-23.604]});
        }

    });

});
