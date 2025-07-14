import { generateReturnsArray } from "./src/investimentsGoals.js";

const form = document.getElementById("investiment-form");

function renderProgression(evt) {
   evt.preventDefault();

   const startingAmount = Number(
      document.getElementById("starting-amount").value
   );

   const additionalContribution = Number(
      document.getElementById("additional-contribution").value
   );

   const timeAmount = Number(document.getElementById("time-amount").value);
   const returnRate = Number(document.getElementById("return-rate").value);

   const returnRatePeriod = document.getElementById("return-rate-period").value;
   const timeAmountPeriod = document.getElementById("time-amount-period").value;

   const taxRate = Number(document.getElementById("tax-rate"));

   const returnsArray = generateReturnsArray(
      startingAmount,
      timeAmount,
      timeAmountPeriod,
      additionalContribution,
      returnRate,
      returnRatePeriod
   );

   console.log(returnsArray);
}

form.addEventListener("submit", renderProgression);
