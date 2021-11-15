class ValidaCPF {
    constructor(cpfSent) {
        Object.defineProperty(this, 'cpfClean', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfSent.replace(/\D+/g, '')
        })
    }

    sequence() {
        return this.cpfClean.charAt(0).repeat(11) === this.cpfClean
    }

    GenerateNewCpf() {
        const cpfLessDigit = this.cpfClean.slice(0, -2)
        const digit1 = ValidaCPF.createDigit(cpfLessDigit)
        const digit2 = ValidaCPF.createDigit(cpfLessDigit + digit1)
        this.newCPF = cpfLessDigit + digit1 + digit2
    }

    static createDigit(cpfLessDigit) {
        let total = 0
        let reverse = cpfLessDigit.length + 1

        for (let stringNumeric of cpfLessDigit) {
            total += reverse * Number(stringNumeric)
            reverse--
        }

        const digit = 11 - (total % 11)
        return digit <= 9 ? String(digit) : '0'
    }

    valida() {
        if (!this.cpfClean) return false
        if (typeof this.cpfClean !== 'string') return false
        if (this.cpfClean.length !== 11) return false
        if (this.sequence()) return false
        this.GenerateNewCpf()

        return this.newCPF === this.cpfClean
    }
}