import { Add } from '@tensorflow/tfjs-core';
import { wait } from '@testing-library/user-event/dist/utils';
import './App.css';


function App() {
  return (
    <div className="App">
      <div className="App-header">
        <br></br>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1280px-OpenAI_Logo.svg.png" height="150vh"/>
      </div>
      <div className="App-result">
        <div className="App-scroll">
          <table id="table" style={{textAlign:'left', justifyContent:'center'}}>
         <tr style={{textAlign:'center'}}>The response of the model will be displayed in this space. Type a request into the text field and enter to submit.</tr>
          <hr></hr>         
        </table>
        </div>
      </div>
      <div className="App-body">
        <form onSubmit={DoStuff}>
          <input id="inputfield" className="App-text"  placeholder="Input Message" type="text"/>
          <input type="submit" onSubmit={DoStuff} style={{display:'none'}}></input>
      </form>
      </div>
    </div>
  );
}



const DoStuff = e => {
  e.preventDefault();
  let input = document.getElementById("inputfield");
  let inputvalue = input.value;
  console.log(inputvalue);
  AddToTable(inputvalue);
  AddToTable("------------")
  fetch("http://localhost:3001/api/summarize?text=" + inputvalue, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.summary);
      AddToTable(data.summary);
      AddToTable("------------")
    });
    input.value = "";
}

function AddToTable(text) {
  let table = document.getElementById("table");
  var row = table.insertRow();
  var cell1 = row.insertCell(0);
  cell1.innerHTML = text;
}
export default App;
