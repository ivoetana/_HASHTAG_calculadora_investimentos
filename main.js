import { generateReturnsArray } from "./src/investimentsGoals.js";
import { Chart } from "chart.js/auto";
import { createTable } from "./src/table.js";

const finalMoneyChart = document.getElementById("final-money-distribution");
const progressionChart = document.getElementById("progression");
const form = document.getElementById("investiment-form");
const clearFormButton = document.getElementById("clear-form");
// const calculateButton = document.getElementById('calculate-results');
let doughnutChartReference = {};
let progessionChartReference = {};

const columnsArray = [
   { colunLabel: "Mês", accessor: "month" },
   {
      colunLabel: "Total Investido",
      accessor: "investedAmount",
      format: (numberInfo) => formatCurrencyToTable(numberInfo),
   },
   {
      colunLabel: "Rendimento Mensal",
      accessor: "interestReturns",
      format: (numberInfo) => formatCurrencyToTable(numberInfo),
   },
   {
      colunLabel: "Rendimento Total",
      accessor: "totalInterestReturns",
      format: (numberInfo) => formatCurrencyToTable(numberInfo),
   },
   {
      colunLabel: "Quantia Total",
      accessor: "totalAmount",
      format: (numberInfo) => formatCurrencyToTable(numberInfo),
   },
];

function formatCurrencyToTable(value) {
   return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatCurrencyToGraph(value) {
   return value.toFixed(2);
}

function renderProgression(evt) {
   evt.preventDefault();
   if (document.querySelector(".error")) {
      return;
   }

   resetCharts();

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

   const finalInvestimentObject = returnsArray[returnsArray.length - 1];

   doughnutChartReference = new Chart(finalMoneyChart, {
      type: "doughnut",
      data: {
         labels: ["Total investido", "Rendimento", "Imposto"],
         datasets: [
            {
               data: [
                  formatCurrencyToGraph(finalInvestimentObject.investedAmount),
                  formatCurrencyToGraph(
                     finalInvestimentObject.totalInterestReturns *
                        (1 - taxRate / 100)
                  ),
                  formatCurrencyToGraph(
                     finalInvestimentObject.totalInterestReturns *
                        (taxRate / 100)
                  ),
               ],
               backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
               ],
               hoverOffset: 4,
            },
         ],
      },
   });

   progessionChartReference = new Chart(progressionChart, {
      type: "bar",
      data: {
         labels: returnsArray.map(
            (investimentObject) => investimentObject.month
         ),
         datasets: [
            {
               label: "Total Investido",
               data: returnsArray.map((investimentObject) =>
                  formatCurrencyToGraph(investimentObject.investedAmount)
               ),
               backgroundColor: "rgb(255, 99, 132)",
            },
            {
               label: "Retorno de Investimento",
               data: returnsArray.map((investimentObject) =>
                  formatCurrencyToGraph(investimentObject.interestReturns)
               ),
               backgroundColor: "rgb(54, 162, 235)",
            },
         ],
      },
      options: {
         responsive: true,
         scales: {
            x: {
               stacked: true,
            },
            y: {
               stacked: true,
            },
         },
      },
   });

   createTable(columnsArray, returnsArray, "results-table");
}

function isObjetctEmpty(obj) {
   return Object.keys(obj).length === 0;
}

function resetCharts() {
   if (
      !isObjetctEmpty(doughnutChartReference) &&
      !isObjetctEmpty(progessionChartReference)
   ) {
      doughnutChartReference.destroy();
      progessionChartReference.destroy();
   }
}

function clearForm() {
   form["starting-amount"].value = "";
   form["additional-contribution"].value = "";
   form["time-amount"].value = "";
   form["return-rate"].value = "";
   form["tax-rate"].value = "";

   resetCharts();

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

const mainEl = document.querySelector("main");
const carouselEl = document.getElementById("carousel");
const previousButton = document.getElementById("slide-arrow-previous");
const nextButton = document.getElementById("slide-arrow-next");

nextButton.addEventListener("click", () => {
   carouselEl.scrollLeft += mainEl.clientWidth;
});

previousButton.addEventListener("click", () => {
   carouselEl.scrollLeft -= mainEl.clientWidth;
});

form.addEventListener("submit", renderProgression);
clearFormButton.addEventListener("click", clearForm);
