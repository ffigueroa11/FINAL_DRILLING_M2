let alert_encabezado = '';
let alert_btnAceptarTx = 'Aceptar';
let alert_btnCancelarTx = 'Cancelar';
let alert_btnAceptarClass = 'btn btn-sm btn-primary btn_text_capitalize';
let alert_btnCancelarClass = 'btn btn-sm btn-default btn_text_capitalize';
let alert_columnClass = 'col-md-6 col-md-offset-3';
let confirm_encabezado = '';
let confirm_btnAceptarTx = 'Aceptar';
let confirm_btnCancelarTx = 'Cancelar';
let confirm_btnAceptarClass = 'btn btn-sm btn-primary btn_text_capitalize';
let confirm_btnCancelarClass = 'btn btn-sm btn-default btn_text_capitalize';

$(document).ready(function() {

    $('#enviar-form').click(function() {

        let nameClass = '.requeridoEnviar'

        let Nombre = $('#Nombre').val()
        let Correo = $('#Email').val()
        let Mensaje = $('#Mensaje').val()

        if (!validaDatosEnviados(nameClass)) return false

        $('#spanNombre').html(Nombre)

        $('#correoLink').text(Correo); // Asignar el valor al texto del enlace
        $('#correoLink').attr('href', 'mailto:' + Correo); // Asignar el atributo href del enlace


        $('#spanMensaje').html(Mensaje)

        $('#formularioContacto')[0].reset()

    })


    $('#Email').on('focusout', function() {
        var email = $(this).val();

        if (email === '') {
            $.alert({
                title: '<i class="fas fa-exclamation-triangle"></i> Advertencia',
                content: 'El campo de correo electrónico no puede estar vacío.',
                type: 'orange',
                onClose: function() {
                    $('#Email').focus(); // Mantener el foco en el campo
                }
            });
        } else if (!validarEmail(email)) {
            $.alert({
                title: '<i class="fas fa-exclamation-triangle"></i> Formato Incorrecto',
                content: 'Por favor, introduce un correo electrónico válido.',
                type: 'red',
                onClose: function() {
                    $('#Email').focus(); // Mantener el foco en el campo
                }
            });

        }
    });
})

function validaSoloLetras(e) {

    tecla = (document.all) ? e.keyCode : e.which;

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8 || tecla == 32) {
        return true;
    }

    // Patrón de entrada, en este caso solo acepta numeros y letras
    patron = /[A-Za-z]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function validarEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validaDatosEnviados(nameClass) {

    let textoLabel = ''
    let contError = 0
    let cantElem = $(nameClass).length

    $(nameClass).each(function() {

        if ($(this).is("input[type=text]")) {
            if ($(this).val().length === 0) {
                let label = $(this).attr('name')

                textoLabel = textoLabel + label + '<br>'
                contError = contError + 1

            }
        }

        if ($(this).is("input[type=email]")) {
            if ($(this).val().length === 0) {
                let label = $('label[for="' + $(this).attr('id') + '"]');
                textoLabel = textoLabel + label.text().replace(':', '') + '<br>';
                contError = contError + 1;
            }
        }

        if ($(this).is("textarea")) {
            if ($(this).val().length === 0) {
                let label = $('label[for="' + $(this).attr('id') + '"]');

                textoLabel = textoLabel + label.text().replace(':', '') + '<br>';
                contError = contError + 1;
            }
        }

    })


    if (contError > 0) {
        //variables de mensaje
        alert_encabezado = '<i class="fa fa-exclamation-triangle red"></i>&nbsp;&nbsp;Error';
        //mostrar mensaje de error 
        var desc_error = 'Ingrese o seleccione un valor en los siguientes campos:<br><br>' + textoLabel;

        $.alert({
            title: alert_encabezado,
            content: desc_error,
            confirmButton: alert_btnAceptarTx,
            confirmButtonClass: alert_btnAceptarClass,
            cancelButtonClass: alert_btnCancelarClass,
            closeIcon: true,
            keyboardEnabled: true,
            confirm: function() {}
        });

        return false
    }

    return true

}