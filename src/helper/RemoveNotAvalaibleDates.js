import { Global } from './Global';

const baseUrl = Global.baseUrl;

export const removeNotAvalaibleDates = (id, date) => {
    fetch( `${ baseUrl }viviendas/${id}` )
    .then(res => {
        if (res.ok) {
            res.json().then(data => {

                var array = data.fechasNoDisponibles;
                for (var i = 0; i < array.length; i++) {
                    if (Date.parse(array[i].fechaInicio) === Date.parse(date)) {
                        data.fechasNoDisponibles.splice(i, 1);
                        break;
                    }
                }

                fetch(`${ baseUrl }viviendas/${ id }`, {method: 'PUT', 
                                                        headers: { "Content-Type": "Application/json" }, 
                                                        body: JSON.stringify(data)});

            });
        };
    });
};