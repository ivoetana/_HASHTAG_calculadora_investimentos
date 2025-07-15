const isNonEmptyArray = (arrayElement) => {
   return Array.isArray(arrayElement) && arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
   if (
      !isNonEmptyArray(columnsArray) &&
      !isNonEmptyArray(dataArray) &&
      !tableId
   ) {
      throw new Error(
         "Para a correta execução, precisamos de um array com as colunas, outro com as informações das linhas e também o id do elemento tabela selecionado"
      );
   }

   const tableElement = document.getElementById(tableId);
   if (!tableElement || tableElement.nodeName !== "TABLE") {
      throw new Error("Id informado não corresponde a nenhum elemento table");
   }

   [
      "w-full",
      "max-h-full",
      "border",
      "border-separate",
      "mt-2",
      "rounded-md",
   ].forEach((cssClass) => tableElement.classList.add(cssClass));

   createTableHeader(tableElement, columnsArray);
   createTableBody(tableElement, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
   function createTheadElement(tableReference) {
      const thead = document.createElement("thead");
      tableReference.appendChild(thead);
      return thead;
   }

   const tableHeaderReference =
      tableReference.querySelector("thead") ??
      createTheadElement(tableReference);

   const headerRow = document.createElement("tr");
   ["bg-emerald-700", "text-white", "sticky", "top-0"].forEach((cssClass) =>
      headerRow.classList.add(cssClass)
   );

   for (const [itemIndex, tableColumnObject] of columnsArray.entries()) {
      let headerElement = 0;

      if (itemIndex == 0) {
         headerElement = /*html*/ `<th class="rounded-tl-md text-center">${tableColumnObject.colunLabel}</th>`;
      } else if (itemIndex == columnsArray.length - 1) {
         headerElement = /*html*/ `<th class="rounded-tr-md text-center">${tableColumnObject.colunLabel}</th>`;
      } else {
         headerElement = /*html*/ `<th class="text-center">${tableColumnObject.colunLabel}</th>`;
      }

      headerRow.innerHTML += headerElement;
   }

   tableHeaderReference.appendChild(headerRow);
}

function createTableBody(tableReference, tableItems, columnsArray) {
   function createTBodyElement(tableReference) {
      const tbody = document.createElement("tbody");
      tableReference.appendChild(tbody);
      return tbody;
   }

   const tableBodyReference =
      tableReference.querySelector("tbody") ??
      createTBodyElement(tableReference);

   for (const [itemIndex, tableItem] of tableItems.entries()) {
      const tableRow = document.createElement("tr");

      if (itemIndex % 2 !== 0) {
         tableRow.classList.add("bg-green-100");
        }else{
          tableRow.classList.add("bg-green-200");
      }

      for (const tableColumn of columnsArray) {
         tableRow.innerHTML += /*html*/ `<td class="text-center">${
            tableItem[tableColumn.accessor]
         }</td>`;
      }
      tableBodyReference.appendChild(tableRow);
   }
}
