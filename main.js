import { generateReturnsArray } from "./src/investimentsGoals.js";

const form = document.getElementById("investiment-form");
const clearFormButton = document.getElementById("clear-form");

function renderProgression(evt) {
   evt.preventDefault();
   if (document.querySelector(".error")) {
      return;
   }

   const startingAmount = Number(
      document.getElementById("starting-amount").value.replace(",", ".")
   );

   const additionalContribution = Number(
      document.getElementById("additional-contribution").value.replace(",", ".")
   );

   const timeAmount = Number(document.getElementById("time-amount").value);
   const returnRate = Number(
      document.getElementById("return-rate").value.replace(",", ".")
   );

   const returnRatePeriod = document.getElementById("return-rate-period").value;
   const timeAmountPeriod = document.getElementById("time-amount-period").value;

   const taxRate = Number(
      document.getElementById("tax-rate").value.replace(",", ".")
   );

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

function clearForm() {
   form["starting-amount"].value = "";
   form["additional-contribution"].value = "";
   form["time-amount"].value = "";
   form["return-rate"].value = "";
   form["tax-rate"].value = "";

   const errorInputsContainers = document.querySelectorAll(".error");

   for (const erroInputContainer of errorInputsContainers) {
      erroInputContainer.classList.remove("error");
      erroInputContainer.classList.add("border-slate-200");
      erroInputContainer.parentElement.querySelector("p").remove();
   }
}

function validateInput(evt) {
   if (evt.target.value === "") {
      return;
   }

   const { parentElement } = evt.target;
   const grandParentElement = evt.target.parentElement.parentElement;
   const inputValue = evt.target.value.replace(",", ".");

   if (
      !parentElement.classList.contains("error") &&
      (isNaN(inputValue) || Number(inputValue) <= 0)
   ) {
      const errorTextElement = document.createElement("p");
      errorTextElement.classList.add("errorParagraph");
      errorTextElement.innerText = "Insira um valor númerico e maior que zero!";

      parentElement.classList.remove("border-slate-200");
      parentElement.classList.add("error");
      grandParentElement.appendChild(errorTextElement);
   } else if (
      parentElement.classList.contains("error") &&
      !isNaN(inputValue) &&
      Number(inputValue) > 0
   ) {
      parentElement.classList.remove("error");
      parentElement.classList.add("border-slate-200");
      grandParentElement.querySelector("p").remove();
   }
}

for (const formElement of form) {
   if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
      formElement.addEventListener("blur", validateInput);
   }
}

form.addEventListener("submit", renderProgression);
clearFormButton.addEventListener("click", clearForm);
