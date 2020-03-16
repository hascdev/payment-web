
export function fecha_actual() {
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    } 
    
    if (mm < 10) {
        mm = '0' + mm;
    }
    
    return yyyy + '' + mm + '' + dd;
}

export function formato_fecha(milliseconds) {
    if (milliseconds == null) {
        return "";
    }
    var date = new Date(milliseconds + Math.abs(new Date(milliseconds).getTimezoneOffset() * 60000));
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

export function formato_hora(milliseconds) {
    if (milliseconds == null) {
        return "";
    }
    var date = new Date(milliseconds);
    return date.toTimeString();
}

export function getLocalIsoDateString(fecha) {
    var tzoffset = fecha.getTimezoneOffset() * 60000;
    var fechaIsoString = (new Date(fecha.getTime() - tzoffset)).toISOString().slice(0,-1);
    return fechaIsoString;
}

export function download_XSLX(base64Encode, filename) {

    var link = document.createElement("a");
    link.download = filename;
    link.href = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + base64Encode;
    link.click();
}

export function download_PDF(base64Encode, filename) {

    var link = document.createElement("a");
    link.download = filename;
    link.href = "data:application/pdf;base64," + base64Encode;
    link.click();
}

export function valida_extension(filename, extension) {

    if (filename.length > 0) {
        var ext = filename.substring(filename.lastIndexOf('.'));
        if (ext == extension) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}

export function valida_contrasenia(contrasenia) {
    
    if (contrasenia.length == 0) {
        return '';
    }
    
    if (contrasenia.length < 8) {
        return 'La Contraseña debe tener mínimo 8 caracteres';
    }
    
    if (contrasenia.replace(/\S/g, "").length > 0) {
        return 'La Contraseña no debe tener espacios en blanco'
    }
    
    if (contrasenia.replace(/[^A-Z]/g, "").length == 0) {       
        return 'La Contraseña debe tener una mayúscula'
    }
    
    if (contrasenia.replace(/[^a-z]/g, "").length == 0) {
        return 'La Contraseña debe tener una minúscula'
    }
    
    if (contrasenia.replace(/[^0-9]/g, "").length == 0) {
        return 'La Contraseña debe tener un número'
    }
    
    if (contrasenia.replace(/\w/g, "").length == 0) {
        return 'La Contraseña debe tener un caracter no alfanumérico'
    }

    return '';
}

export function valida_rut(rut) {

    rut = rut.split('.').join('');
    rut = rut.split('-').join('');

    //Valor acumulado para el calculo de la formula
    var nAcumula = 0;
    //Factor por el cual se debe multiplicar el valor de la posicion
    var nFactor = 2;
    //Digito verificador
    var nDv = 0;
    var nDvReal;
    //extraemos el ultimo numero o letra que corresponde al verificador
    //La K corresponde a 10
    if (rut.charAt(rut.length - 1).toUpperCase() == 'K' )
        nDvReal = 10;
    //el 0 corresponde a 11
    else if (rut.charAt(rut.length - 1)== 0 )
        nDvReal = 11;
    else
        nDvReal = rut.charAt(rut.length - 1);
    for (var nPos = rut.length -2; nPos >=0; nPos--) {
        nAcumula += rut.charAt(nPos).valueOf() * nFactor;
        nFactor++;
        if (nFactor > 7) nFactor = 2;
    }

    nDv = 11-(nAcumula % 11)
    if (nDv == nDvReal) {
        return true;
    } else {
        return false;
    }
}

export function valida_patente(patente) {

    if (patente.length > 0) {
        var regex = /^[a-z]{2}[\.\- ]?[0-9]{2}[\.\- ]?[0-9]{2}|[b-d,f-h,j-l,p,r-t,v-z]{2}[\-\. ]?[b-d,f-h,j-l,p,r-t,v-z]{2}[\.\- ]?[0-9]{2}$/i;
        if (regex.test(patente)) {
            return true;
        } else {
            return false;
        }
    }

    return true;
}

export function valida_email(email) {
    if (email.length > 0) {
        var regex = /^[a-zA-ZñÑ0-9\+\.\_\%\-\+]{1,256}\@[a-zA-ZñÑ0-9][a-zA-ZñÑ0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{1,25})+$/;
        if (regex.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    return true;
}

export function valida_fecha(fecha) {

    if (fecha.length > 0) {
        var regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        if (regex.test(fecha)) {
            return true;
        } else {
            return false;
        }
    }

    return true;
}

export function formato_rut(srut) {
    
    if (srut == null || srut == 0) {
        return "";
    }

    var cont = 0;
    var formato;

    srut = srut.split('.').join('');
    srut = srut.split('-').join('');

    var regex = /^(\d*)[k|K|0-9]{1}$/;

    if (srut.length == 0) {
        return "";
    } else if (srut.length > 1 && regex.test(srut)) {
        formato = "-" + srut.substring(srut.length - 1);
        for (var i = srut.length - 2; i >= 0; i--) {
            formato = srut.substring(i, i+1) + formato;
            cont++;
            if (cont == 3 && i != 0) {
                formato = "." + formato;
                cont = 0;
            }
        }
        return formato;
    } else {
        return regex.test(srut) ? srut : formato_rut(srut.substring(0, srut.length - 1));
    }
}

export function formato_monto(valor, aceptaNegativos) {
    if( aceptaNegativos == null ) aceptaNegativos = false;
    
    if (valor == null) {
        return "";
    }
    
    valor = valor.toString().split('.').join('');
    var cont = 0;
    var formato = "";
    var regex = aceptaNegativos ? /^\-?\d*$/ : /^\d*$/;
    
    if (valor.length == 0) {
        return "";
    } else if (valor.length > 1 && regex.test(valor)) {
        let negativo = valor.startsWith("-");
        if( aceptaNegativos && negativo ) valor = valor.substring(1);
        
        for (var i = valor.length - 1; i >= 0; i--) {
            formato = valor.substring(i, i+1) + formato;
            cont++;
            if (cont == 3 && i != 0) {
                formato = "." + formato;
                cont = 0;
            }
        }
        
        if( aceptaNegativos && negativo ) formato = "-" + formato;
        return formato;
    } else {
        return regex.test(valor) ? valor : formato_monto(valor.substring(0, valor.length - 1));
    }
}

export function formato_numerico(valor) {
    var regex = /^\d*$/;
    if (regex.test(valor)) {
        return valor;
    } else {
        return formato_numerico(valor.substring(0, valor.length - 1));
    }
}

export function formato_alphanumerico(valor) {
    var regex = /[^a-zA-ZñÑ\d]/i;
    if (!regex.test(valor)) {
        return valor;
    } else {
        return formato_alphanumerico(valor.substring(0, valor.length - 1));
    }
}

export function formato_texto(valor) {
    var regex = /[^a-zA-ZñÑáàéèíìóòúùüÁÀÉÈÍÌÓÒÚÙÜ\.\-\s]/i; // para texto sin espacios usar: /^[a-zA-Z]*$/
    if (!regex.test(valor)) {
        return valor;
    } else {
        return formato_texto(valor.substring(0, valor.length - 1));
    }
}

export function formato_email(valor) {
    var regex = /[^a-zA-ZñÑ1-9-_@.]/i;
    //console.log(regex.test(valor));
    if (!regex.test(valor)) {
        return valor;
    } else {
        return formato_email(valor.substring(0, valor.length - 1));
    }
}

export function build_url(url, params) {
    Object.keys(params).forEach(key => {
        var param = key+'='+escape(params[key]);
        var sep = '&';
        if (url.indexOf('?') < 0) {
            sep = '?';
        } else {
            var lastChar=url.slice(-1);
            if (lastChar == '&') sep='';
            if (lastChar == '?') sep='';
        }
        url += sep + param;
    });
    console.log(url);
    return url.toString();
}

export function notNull(value) {
    if (value && value != null) {
        return value.toString();
    }
    return '';
}

export function isEmptyObj(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function getElement(array, id) {
    var element = null;
    if( array && array.length > 0 ){
        array.map((item, index) => {
            if (item.id == id) {
                element = item;
            }
        });
    }
    return element;
}

export function setMinTimeDate(d){
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
}

export function concatText(text, element) {
    if (text && text.length > 0) {
        if (notNull(element).length > 0) {
            text = text + ', ' + element;
        }
        return text;
    }
    return element;
}