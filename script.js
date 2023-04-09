
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()//To set all values to default when creating a new calculator
    }
    //will clear different variables
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined //if nothing is selected and screen is cleared

    }
    //remove single number from right to left
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)//convert to string and go from index 0 to 1 from end from all characters in string

    }
    //add the number to screen which is clicked
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return//to check if a . is already existing and if does then user cannot add more than 1 '.' s
        this.currentOperand = this.currentOperand.toString() + number.toString()//to convert to string otherwise js will take only single number even when a number is clicked mutiple times

    }
    //trigger when user select an operation
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation//st operation to operation we passed in
        this.previousOperand = this.currentOperand//donr typing current number recycle it to previous operand
        this.currentOperand = ''//to clear current operand

    }
    //take values inside and div the single value which need to be displayed
    compute() {
        let computation//result off compute function
        const prev = parseFloat(this.previousOperand)//converting string to a number(Number version of previous operand)
        const current = parseFloat(this.currentOperand)//(Number version of current operand)
        if (isNaN(prev) || isNaN(current)) return//avoid running function if user dosent enter anything and press =
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return

        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }


    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }



    //to update values inside output

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)

        //to implement the operation symbole in the display
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`

        } else {
            this.previousOperandTextElement.innerText = ''
        }

    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//number button functionality(0-.)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//calling choose operation function
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
//calling compute function when = is clicked
equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
//calling clear function
allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})
//calling delete function
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
