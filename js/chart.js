$(document).ready(function(){
    const data = {
        labels: [],
        datasets: []
    };

    const config = {
        data: data,
    };

    let scalesDisplay = {
        "pie": false,
        "bar": true,
        "line": true
    }
    let myChart = new Chart($('#myChart'), "");

    function createChart(type, anio) {
        let i = 0;
        let inx = 0;
        let copiaAnios = years;
        config.data.labels = [];
        config.data.datasets = [];
        config.options = setOptions(type);

        if(!isNaN(anio)) {
            copiaAnios = [anio];
            inx = getIndexAnio(anio);
        }else{
            inx = i;
        }
        
        for(; i < copiaAnios.length; i++, inx++) {
            let anio = years[inx];            
            let color = generarNuevoColor();

            config.data.labels = labels;           
            config.data.datasets.push({
                label: 'Data' + anio,
                backgroundColor: color,
                borderColor: color.slice(0,7),
                data: emergencias[inx],
                borderWidth: 2,
                barPercentage: 1,
                hoverBackgroundColor: color.slice(0,7)
            });
            config.type = type;
        }        

        myChart = new Chart($('#myChart'), config);
    }

    function setOptions(type) {
        return {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(data) {
                            return "Total: "+ data.formattedValue;
                        }
                    }
                },
                legend: {
                    labels: {
                        font: {
                            weight: "bold"
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: scalesDisplay[type],
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: scalesDisplay[type],
                    grid: {
                        borderWidth: 3,
                        borderColor: "#CFCFCF",
                    }
                }
            }
        }
    }

    function generarNuevoColor(){
        let simbolos, color;
        simbolos = "0123456789ABCDEF";
        color = "#";

        for(let i = 0; i < 6; i++){
            color = color + simbolos[Math.floor(Math.random() * 16)];
        }

        return color+"57";
    }

    $("#selectorYear").on("change",function(){
        myChart.destroy();
        let type = $("#selectorTypes").val();
        let anio = parseInt($(this).val());
        createChart(type, anio);
    });

    $("#selectorTypes").on("change",function(){
        myChart.destroy();
        let type = $(this).val();
        let anio = parseInt($("#selectorYear").val());

        createChart(type, anio);
    });

    setTimeout(() => {
        $("#selectorYear").trigger("change");
    }, 200);
});