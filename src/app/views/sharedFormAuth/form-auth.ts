export class FormAuth {

    textoDoInput : String;
    tipoDoInput : String;
    ResultadoAutenticacao : any = {
        'showWarn?' : false,
        'mssg' : null
    };

    constructor(textoInput? : String, tipoInput? : String) {
        this.textoDoInput = textoInput;
        this.tipoDoInput = tipoInput;
    }

    checkEmailInput() {
        if (this.textoDoInput == "" && this.tipoDoInput == 'email') {
            this.ResultadoAutenticacao = {
                'showWarn?' : true,
                'mssg' : `Campo vázio e endereço de email inválido`
            }
            return false;
        } else if (this.tipoDoInput == 'email' && this.textoDoInput.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            this.ResultadoAutenticacao = {
                'showWarn?' : true,
                'mssg' : `Endereço de email inválido`
            }
            return false;
        }

        this.ResultadoAutenticacao['showWarn?'] = false;

        return true;        
    }

    checkTextInput() {
        if (this.textoDoInput == "" && this.tipoDoInput == 'text') {
            this.ResultadoAutenticacao = {
                'showWarn?' : true,
                'mssg' : `Campo de texto vazio`
            }
            return false;
        }

        this.ResultadoAutenticacao['showWarn?'] = false;

        return true;
    }

}
