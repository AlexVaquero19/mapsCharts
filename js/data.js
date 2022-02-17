let emergencias = [];
let firstMonth = 0;
let avg = 0;
let types = ["bar", "line", "pie"]
let years = [2019, 2020, 2021];
let labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getIndexAnio(anio) {
    let res = -2;
    years.forEach(function callback(item, index, array) {
        if(anio == item) {
            res = index;
        }
    });
    return res;
}

function getLista(anio) {
    let inx = getIndexAnio(anio);
    return emergencias[inx];
}

$(document).ready(function(){
    $("#selectorTypes").select2();
    $("#selectorYear").select2();
    $("#selectorYear").append('<option selected value="">' +" Todos los Años " + '</option>');
    setupTypeSelects();

    for (let i = 0; i < years.length; i++) {
        emergencias.push([]);
        $("#selectorYear").append('<option value="' + years[i] + '">' +"Año " + years[i] + '</option>');
        $.getJSON("./files/data" + years[i] +".geojson", function(data){
            dataJSON(data, years[i]);
        });
    }

    function dataJSON(data, anio){
        data.features.forEach(
            object => createArray(object.properties.fecha, object.properties, anio)
        );
    }

    function resetMonth(month) {
        if(er_list[month] == 0) {
            return true;
        }
        return false;
    }

    function createArray(date, properties, anio){
        let month = parseInt(date.split("/")[1]) -1;
        er_list = getLista(anio);

        if(resetMonth(month)) {
            if(month == 0)
                firstMonth = 0;
        }

        if(er_list[month] == undefined)
            er_list[month] = 0;

        if(month == firstMonth){
            er_list[month] += properties.total;
        }else{
            firstMonth += 1;
        }
    }

    function setupTypeSelects(){
        for (let i = 0; i < types.length; i++) {
            $("#selectorTypes").append('<option value="' + types[i] + '">' +"Tipo: " + camelCase(types[i]) + '</option>');
        }
    }
    function camelCase(str){
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }
});