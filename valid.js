class ValidateForm {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos()
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const checkFields = this.checkFields();
        const validPasswords = this.validPasswords();

        if (checkFields && validPasswords) {
            alert('Formulário enviado.');
            this.formulario.submit();
        }
    }

    validPasswords() {
        let valid = true
        const password = this.formulario.querySelector('.senha')
        const repeatPassword = this.formulario.querySelector('.repetir-senha')

        if (password.value !== repeatPassword.value) {
            valid = false
            this.createErro(password, 'Campos senha  e repetir senha precisam ser iguais')
            this.createErro(repeatPassword, 'Campos senha  e repetir senha precisam ser iguais')
        }

        if (password.value.length < 6 || password.value.length > 12) {
            valid = false
            this.createErro(password, 'Senha precisa estar entre 6 e 12 caracteres')
        }
        return valid
    }

    checkFields() {
        let valid = true

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        for (let field of this.formulario.querySelectorAll('.validar')) {
            const label = field.previousElementSibling.innerText

            if (!field.value) {
                this.createErro(field, `Campo "${label}" não pode estar em branco`)
                valid = false
            }

            if (field.classList.contains('cpf')) {
                if (!this.validateCPF(field)) valid = false
            }

            if (field.classList.contains('user')) {
                if (!this.validateUser(field)) valid = false
            }
        }
        return valid
    }

    validateUser(field) {
        const user = field.value
        let valid = true

        if (user.length < 3 || user.length > 12) {
            this.createErro(field, 'Usuario precisa ter entre 3 e 12 caracteres')
            valid = false
        }

        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createErro(field, 'Nome de usuario precisa conter apenas letras e numeros')
            valid = false
        }
        return valid
    }

    validateCPF(field) {
        const cpf = new ValidaCPF(field.value)

        if (!cpf.valida()) {
            this.createErro(field, 'CPF invalido')
            return false
        }

        return true
    }

    createErro(field, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        field.insertAdjacentElement('afterend', div)
    }

}

const validate = new ValidateForm()




