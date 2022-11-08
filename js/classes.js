
//  classes
// every thing related to the insurance
class  Insurance {
    constructor(model, year, insuranceType){
    this.model = model,
    this.year = year,
    this.insuranceType = insuranceType;
   } 
   // calculating price based on selected items
    calculatePrice(info) {
        let price;
    
        //  get initial price  based on car model
        price = this.calculateModel (info);
    
        // get the year
        const year = info.year;
        //  calculating car age
        const carAge = this.getDifferenceYear(year);
        //  It is assumed that there is a 3% discount every year
        price = price - ((3 * carAge) / 100) * price;
    
        //  get the insurance type
        const insuranceType = info.insuranceType;
        price = this.calculateInsuranceType(insuranceType, price);
    
        return price;
    };
    
    //  calculating price based on car model
    calculateModel (info) {
        let priceBasedModel;
        // get the model value
        let model = info.model;
        //  determine basic price for insurance
        let basicPrice = 200;
        /*
        Toyota YARIS sedan ==> basicPrice * 1.15
        Toyota COROLLA ==>  basicPrice * 1.30
        oyota LAND CRUISER ==> basicPrice * 1.80
        */
        switch (model) {
        case "1":
            priceBasedModel = basicPrice * 1.15;
            break;
        case "2":
            priceBasedModel = basicPrice * 1.3;
            break;
        case "3":
            priceBasedModel = basicPrice * 1.8;
            break;
        }
        return priceBasedModel;
    };
    
    //  calculating car age
    getDifferenceYear (year) {
        //  current year
        let maxYear = new Date().getFullYear();
        //  number of years the car was made
        let carAge = maxYear - year;
        return carAge;
    };
    
    //  calculating insurance based on insurance type
    calculateInsuranceType(insuranceType, price) {
        /*
        insuranceType = basic ==> increase 30%
        insuranceType = Comprehensive ==> increase 50%
        */
        if (insuranceType == "basic") {
        price = price * 1.3;
        } else {
        price = price * 1.5;
        }
        return price;
    };

}


// every thing related to the html
class HTMLUI {
        //  add years to select related to year of manufacture on loaded
    addYearsToSelect () {
        //  current year
        let maxYear = new Date().getFullYear();
        // determine min year
        let minYear = maxYear - 20;
        //  access to year select
        const year = document.querySelector("#year");
        //  add last twenty years into select related to year of manufacture
        for (let i = maxYear; i >= minYear; i--) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        year.appendChild(option);
        }
    };
    //  displaying message error  on the top of form
    displayError (err) {
        const div = document.createElement("div");
        div.classList = "error";
        div.innerHTML = err;
        //inserting new div before form
        cast.insertBefore(div, form);
        //  remove error after 3 seconds
        setTimeout(() => {
        document.querySelector(".error").remove();
        }, 3000);
    };
    
    //  showing result in invoice
    showResult (price, info) {
        //  Round a Number to 2 Decimal Places
        let finalPrice = price.toFixed(2);
        //  access to the factor
        const factor = document.querySelector("#factor");
    
        //  create a div
        const div = document.createElement("div");
    
        //  get the value of car
        let model = info.model;
    
        /*
        model : 1 ==> Toyota YARIS sedan
        model : 2 ==> Toyota COROLLA
        model : 3 ==> Toyota LAND CRUISER
        */
        // convert model value to car's name
        switch (model) {
        case "1":
            model = "Toyota YARIS sedan";
            break;
        case "2":
            model = "Toyota COROLLA";
            break;
        case "3":
            model = "Toyota LAND CRUISER";
            break;
        }
        //  get the value of insurance
        let insuranceType = info.insuranceType;
    
        //  convert insurance value to insurance name
        if (insuranceType == "basic") {
        insuranceType = "Casualty Insurance";
        } else {
        insuranceType = "insurance_name";
        }
    
        //   add details in div
        div.innerHTML = `
        <p class="header">Invoice summary</p>
        <p> Car Model : ${model}</p>
        <p>Year of construction : ${info.year}</p>
        <p>Type of Insurance : ${insuranceType}</p>
        <p>Final Price :  £ ${finalPrice} </p>
        `;
    
        //  show spinner
        const spinner = document.querySelector("#loading img");
        spinner.style.display = "block";
        //   remove spinner after3 seconds
        setTimeout(() => {
            spinner.style.display = "none";
            //  add div to the factor
            factor.appendChild(div);
            factor.style.display = "block";
        }, 3000);
    };
    
}


