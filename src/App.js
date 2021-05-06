import React, { Component } from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from "./components/KeyPadComponent";

class App extends Component {
    constructor(){
        super();

        this.state = {
            result: "",
            counterPoint: 0
        }
    }

    onClick = button => {

        if(button === "="){
            this.calculate()
        }

        else if(button === "C"){
            this.reset()
        }
        else if(button === "CE"){
            this.backspace()
        }

        else {

            if(button === "."){
                this.setState({
                    counterPoint: this.state.counterPoint + 1
                })
                this.setState({
                    result: this.state.result + (this.state.counterPoint % 2 !== 0 ? button : '')
                })
            } else {
                this.setState({
                    result: this.state.result + button
                })
            }
        }
    };


    insertDotInsideString = (str, position) => {
        // In this case, we want to insert a dot 3 positions before
        var arrStr = str.split('')
        var newPosition = position - 2
        arrStr.splice(newPosition, 0, '.')
        var newStr = arrStr.join('')
        return newStr
    }

    searchForHighNumbers = (str) => {
        return new Promise((resolve, reject) => {
            try{
                var counter = 0;
                for (var i = 0; i <= str.length; i ++) {
                    if(!isNaN(str.charAt(i))) 
                        counter += 1;
                    else counter = 0;
                    if(counter === 4) 
                        str = this.insertDotInsideString(str, i)
                    if(i === str.length - 1) resolve(str);
                }
            } catch(error){
                reject(error)
            }
        })
    }

    calculate = async () => {

        var checkResult = ''

        if(this.state.result.includes('--'))
            checkResult = this.state.result.replace('--','+')

        else checkResult = this.state.result

        // No resta bien, en lugar de restar -> suma
        checkResult = this.state.result.replaceAll('-','+')

        // Recorro el string buscando numeros mayores a 1000
        checkResult = await this.searchForHighNumbers(checkResult)

        // Toda multiplicación la multiplica por 2
        if(checkResult.includes('*')) checkResult += '*2'
        
        try {
            console.log("🚀 ~ checkResult", checkResult)
            this.setState({
                // eslint-disable-next-line
                result: (eval(checkResult) || "" ) + ""
            })
        } catch (e) {
            this.setState({
                result: "error"
            })

        }
    };

    reset = () => {
        this.setState({
            result: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };

    render() {
        return (
            <div>
                <div className="calculator-body">
                    <h1>Simple Calculator</h1>
                    <ResultComponent result={this.state.result}/>
                    <KeyPadComponent onClick={this.onClick}/>
                </div>
            </div>
        );
    }
}

export default App;
