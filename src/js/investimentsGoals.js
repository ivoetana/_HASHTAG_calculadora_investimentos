function convertToMonthlyReturnRate(yearlyReturnRate) {
   return yearlyReturnRate ** (1 / 12);
}

export function generateReturnsArray(
   startingAmount = 0,
   timeHorizon = 0,
   timePeriod = "monthly",
   monthlyContribution = 0,
   returnRate = 0,
   returnaTimeFrame = "monthly"
) {
   if (!timeHorizon || !startingAmount) {
      throw new Error(
         "Investimento inicial e prazo devem ser preenchidos com valore positivos."
      );
   }

   const finalReturnRate =
      returnaTimeFrame === "monthly"
         ? 1 + returnRate / 100
         : convertToMonthlyReturnRate(1 + returnRate / 100);

   const finalTimeHorizon =
      timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

   const referenceInvestimentObject = {
      investedAmount: startingAmount,
      interestReturns: 0,
      totalInterestReturns: 0,
      month: 0,
      totalAmount: startingAmount,
   };

   const returnsArray = [referenceInvestimentObject];

   for (
      let timeReference = 1;
      timeReference <= finalTimeHorizon;
      timeReference++
   ) {
      const totalAmount =
         returnsArray[timeReference - 1].totalAmount * finalReturnRate +
         monthlyContribution;

      const interestReturns =
         returnsArray[timeReference - 1].totalAmount * (finalReturnRate - 1);

      const investedAmount =
         startingAmount + monthlyContribution * timeReference;

      const totalInterestReturns = totalAmount - investedAmount;

      returnsArray.push({
         investedAmount,
         interestReturns,
         totalInterestReturns,
         month: timeReference,
         totalAmount,
      });
   }

   return returnsArray;
}
