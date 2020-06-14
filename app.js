const history=document.getElementById('history-value');
const output=document.getElementById('output-value');
let operator=document.getElementsByClassName('operator');
let number=document.getElementsByClassName('number');
const microphone=document.getElementById('microphone')

function getHistory(){
    return history.innerText
}
function printHistory(num){
    history.innerText=num;
}
// printHistory("2*2=4")
function getOutput(){
    return output.innerText
}
function printOutput(num){
    if(num==""){
        output.innerText=num
    }else{
    output.innerText=getFormattedNumber(num);
    }
}
// printOutput("900000");
//Adding commas to number --Trick
function getFormattedNumber(num){
    let n = Number(num);
    const value=n.toLocaleString("en-IN")
    return value;
}
function reverseFormat(num){
    // console.log(Number(num.replace(/,/,'')));
    return Number(num.replace(/,/g,''))
}
for(i = 0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        // console.log(this.id);
        
        if(this.id=='clear'){
            printHistory("");
            printOutput("")
        }
      else if(this.id=="backspace"){
            let output=reverseFormat(getOutput()).toString();
            if(output){
                output=output.substr(0,output.length-1)
                printOutput(output)
            }
        }else{
            let output=getOutput();
            let history=getHistory();
            if(output!=""){
                output=reverseFormat(output);
                history=history+output;
                // console.log(history);
                
                if(this.id == '='){
                    console.log(history);
                    let result=eval(history)
                    console.log(result);
                    
                    printOutput(result)
                    printHistory("")
                }
                else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
                }
            }
        }
    })
}

for(i = 0;i<number.length;i++){
    number[i].addEventListener('click',function(){
        var output=reverseFormat(getOutput())
        if(output!=NaN){
            output=output+this.id;
            printOutput(output)
        }
    })
}
microphone.onclick=function(){
    let recogniton=new (window.SpeechRecognition || window.webkitSpeechRecognition)
    microphone.classList.add('record');
    recogniton.start();
    recogniton.lang='en-US';
    operations={"plus":"+",
                "minus":"-",
                "multiply":"*",
                "multiplied":"*",
                "divide":"/",
                "reminder":"%"
                }
    recogniton.onresult=function(event){
        let input=event.results[0][0].transcript;
        for (property in operations){
            input=input.replace(property,operations[property])
        }
        console.log(input);
        output.innerText=input;
        setTimeout(function(){
            evaluate(input)
        },2000)
        microphone.classList.remove('record')
    }
}
function evaluate(input){
    try{
        let res=eval(input);
        output.innerText=res
    }
    catch(e){
        console.log(e);
        output.innerText=""
    }
}
