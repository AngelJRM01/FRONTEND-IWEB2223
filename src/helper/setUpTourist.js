import { Global } from './Global';

const datosAbiertosUrl = Global.datosAbiertosUrl;

const modificarComunidadAutonoma = (comunidadAutonoma) => {
    switch(comunidadAutonoma){
        case 'Andalucía' : return "Andalucía"
        case 'Aragón' : return "Aragón"
        case 'Asturias' : return "Asturias, Principado de"
        case 'Islas Baleares' :  return "Balears, Illes"
        case 'Canarias' : return "Canarias"
        case 'Cantabria' : return "Cantabria"
        case 'Castilla y León' : return "Castilla y León"
        case 'Castilla-La Mancha' : return "Castilla - La Mancha"
        case 'Cataluña' : return "Cataluña"
        case 'Comunidad Valenciana' : return "Comunitat Valenciana"
        case 'Extremadura' : return "Extremadura"
        case 'Galicia' : return "Galicia"
        case 'Comunidad de Madrid' : return "Madrid, Comunidad de"
        case 'Región de Murcia' : return "Murcia, Región de"
        case 'Navarra' : return "Navarra, Comunidad Foral de"
        case 'País Vasco' : return "País Vasco"
        case 'La Rioja' : return "Rioja, La"
        case 'Ceuta' : return "Ceuta"
        case 'Melilla' : return "Melilla"
        default : return ""
    }
}

export const setUpTourist = ( latitud, longitud, setUpTourist ) => {
  

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}&zoom=18&addressdetails=1`)
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                    if(data.address !== undefined){
                        if(data.address.state !== undefined){
                            const comunidadAutonoma = modificarComunidadAutonoma(data.address.state);
                            fetch( `${datosAbiertosUrl}tourists/peak/${comunidadAutonoma}` )
                              .then(res => {
                                  if (res.status === 200) {
                                      res.json().then(data => {
                                        setUpTourist(data);
                                      });
                                  };
                              });
                        } else if(data.address.city !== undefined){
                            const comunidadAutonoma = modificarComunidadAutonoma(data.address.state)
                            fetch( `${datosAbiertosUrl}tourists/peak/${comunidadAutonoma}` )
                              .then(res => {
                                  if (res.status === 200) {
                                      res.json().then(data => {
                                        setUpTourist(data);
                                      });
                                  };
                              });
                        }
                    }
                })
            }
        })
    
};