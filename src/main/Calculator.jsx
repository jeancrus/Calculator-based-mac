import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

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
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation() {
        console.log('operation');

    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
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

        return (
            <div className="calculator">
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