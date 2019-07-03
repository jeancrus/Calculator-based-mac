import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'
import KeyboardEventHandler from 'react-keyboard-event-handler';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            switch (currentOperation) {
                case '+':
                    values[0] = values[0] + values[1]
                    break;
                case '-':
                    values[0] = values[0] - values[1]
                    break;
                case '*':
                    values[0] = values[0] * values[1]
                    break;
                case '/':
                    values[0] = values[0] / values[1]
                    break;
                default:

                // modo que o professor fez...
                /* 
                try {
                    values[0] = eval(`${values[0] ${currentOperation} ${values[1]}}`)
                    values[1] = 0
                    }
                    
                */
            }
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }

    }



    addDigit(n) {
        if (n === '.' && this.state.displayValue === '0') {
            return this.setState({ displayValue: '0.' })
        }
        else if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay // o clearDisplay será verdadeiro se estiver 0 ou a flag do estado estiver como verdadeira
        const currentValue = clearDisplay ? '' : this.state.displayValue // se o display precisar ser limpado, o current será vazio ou 
        //receberá o valor atual
        const displayValue = currentValue + n // o valor digitado será o current + a variável digitada
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)

        }

    }

    render() {
        // const addDigit = n => this.addDigit(n)
        // const setOperation = op => this.setOperation(op) outras formas para configurar o this para instancia atual
        const digitOrOperation = (key) => {
            switch (key) {
                case '+':
                case '-':
                case '*':
                case '/':
                case '=':
                    this.setOperation(key)
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '0':
                case '.':
                    this.addDigit(key)
                    break;
                case 'Backspace':
                    this.clearMemory()
                    break;
                default:

            }
        }
        return (
            <div className="calculator">
                <KeyboardEventHandler handleKeys={['all']}
                    onKeyEvent={(key, e) => digitOrOperation(e.key)} />
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                {/* <Button label="AC" click={() => this.clearMemory()} /> usado com arrow function */}
                <Button label="/" click={this.setOperation} operation />
                {/* <Button label="/" click={setOperation} /> usado com arrow function */}
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}