/* Calculations
    This file holds functions for accessing various calculations
*/
//var psychrolib = require('../libraries/psychrolib/psychrolib.js');
//psychrolib.SetUnitSystem(psychrolib.SI);

/*Calculates the BTU of an outdoor cooling system.*/
function CalculateCoolingBTU(CFM) {
    var Enthalpy = 12//pyschrolib.GetDryAirEnthalpy(4.397);
    return CFM * Enthalpy * 4.397
}

/*Calculates the BTU of an indoor heating system. Can be given a temperature or calculate using library.*/
function CalculateHeatingBTU(CFM, Temperature = null) {
    if (Temperature == null) {
        Temperature = 12;
    }
    return CFM * Temperature * 1.055
}

/*Utility functions below*/
function ConvertToCelsius(Fahrenheit) {
    return ((Fahrenheit - 32) * .5556)
}

function ConvertToFahrenheit(Celsius) {
    return ((Celsius * 1.8) + 32)
}

export var Calculations = {
    CoolingBTU: CalculateCoolingBTU,
    HeatingBTU: CalculateHeatingBTU
}