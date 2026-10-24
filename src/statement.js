function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = addInvoiceHead();

  function addInvoiceHead() {
    return `Statement for ${invoice.customer}\n`;
  }

  function toUSD(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber);
  }

  for (let aPerformance of invoice.performances) {
    let thisAmount = calculateAmountForEach(aPerformance);
    saveCreditsForBenefitsProgram(aPerformance);
    addPerformanceToInvoice(aPerformance, thisAmount);
    totalAmount += thisAmount;
  }
  finishInvoiceAndPrintResult();

  return result;


  function getPlayFrom(aPerformance) {
    return plays[aPerformance.playID];
  }

  function calculateAmountForEach(aPerformance) {
    let unityAmount = 0;
    switch (getPlayFrom(aPerformance).type) {
      case "tragedy":
        unityAmount = 40000;
        if (aPerformance.audience > 30) {
          unityAmount += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        unityAmount = 30000;
        if (aPerformance.audience > 20) {
          unityAmount += 10000 + 500 * (aPerformance.audience - 20);
        }
        unityAmount += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${getPlayFrom(aPerformance).type}`);
    }
    return unityAmount;
  }

  function saveCreditsForBenefitsProgram(aPerformance) {
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === getPlayFrom(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5);
  }

  function addPerformanceToInvoice(aPerformance, thisAmount) {
    result += ` ${getPlayFrom(aPerformance).name}: ${toUSD(thisAmount / 100)} (${aPerformance.audience} seats)\n`;
  }

  function finishInvoiceAndPrintResult(){
    result += `Amount owed is ${toUSD(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
  }


}
module.exports = { statement };