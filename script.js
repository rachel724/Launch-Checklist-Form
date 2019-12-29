let form = null;
let buttonSubmit = null;
let pilotNameInput = null;
let copilotNameInput = null;
let fuelLevelInput = null;
let cargoMassInput = null;
let pilotStatus = null;
let copilotStatus = null;
let launchStatus = null;
let fuelStatus = null;
let cargoStatus = null;
let faultyItems = null;

window.addEventListener("load", function(){
  this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
    response.json().then( function(json){
      const div = document.getElementById("missionTarget");
      div.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
          <li>Name: ${json[0].name}</li>
          <li>Diameter: ${json[0].diameter}</li>
          <li>Star: ${json[0].star}</li>
          <li>Distance from Earth: ${json[0].distance}</li>
          <li>Number of Moons: ${json[0].moons}</li>
        </ol>
        <img src="${json[0].image}">`;
    })
  })
  form = document.querySelector("form");
  buttonSubmit = document.getElementById("formSubmit");
  pilotNameInput = document.querySelector("input[name=pilotName]");
  copilotNameInput = document.querySelector("input[name=copilotName]");
  fuelLevelInput = document.querySelector("input[name=fuelLevel]");
  cargoMassInput = document.querySelector("input[name=cargoMass]");
  launchStatus = document.getElementById("launchStatus");
  pilotStatus = document.getElementById("pilotStatus");
  copilotStatus = document.getElementById("copilotStatus");
  fuelStatus = document.getElementById("fuelStatus");
  cargoStatus = document.getElementById("cargoStatus");
  faultyItems = document.getElementById("faultyItems");

  form.addEventListener("submit", function(event) {
    if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === ""){
         alert("All fields are required.");  
         event.preventDefault();
    };
    if (isNaN(Number(fuelLevelInput.value))){
          alert("Fuel Level must be a number.");
          event.preventDefault();
    };
    if (isNaN(Number(cargoMassInput.value))){
          alert("Cargo Mass must be a number.");
          event.preventDefault();
    };
    event.preventDefault();
    //alert("this is happening");
    pilotStatus.innerHTML = `${pilotNameInput.value} is ready for launch.`;
    copilotStatus.innerHTML = `${copilotNameInput.value} is ready for launch.`;
    faultyItems.style.visibility = "visible";
    //debugger;
    if(fuelLevelInput.value < 10000 || cargoMassInput.value > 10000){
      launchStatus.innerHTML = `Shuttle not ready to launch.`;
      launchStatus.style.color = "red";
    } else {
      launchStatus.innerHTML = `Shuttle is ready for launch.`;
      launchStatus.style.color = "green";
    }
    if(fuelLevelInput.value < 10000){
      fuelStatus.innerHTML = `Fuel Status: There is not enough fuel for the journey.  Need an additional ${10000 - fuelLevelInput.value} liters of fuel.`;
    } else if(cargoMassInput.value > 10000){
      cargoStatus.innerHTML = `Cargo Mass too high for launch.  Must remove ${cargoMassInput.value - 10000} kg of cargo.`;
    } else {

    }
  });
})

/* This block of code shows how to format the HTML once you fetch some planetary JSON!

*/
