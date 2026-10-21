function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let aPerformance of invoice.performances) {
    let thisAmount = 0;
    thisAmount = calculateAmountBill(aPerformance);
    benefitsProgram(aPerformance);
    addPerformanceToInvoice(aPerformance, thisAmount);
    totalAmount += thisAmount;
  }

  finishInvoiceAndPrintResult();
  return result;

  function getPlayFrom(aPerformance) {
    return plays[aPerformance.playID];
  }

  function calculateAmountBill(perf) {
    let unityAmount = 0;
    switch (getPlayFrom(perf).type) {
      case "tragedy":
        unityAmount = 40000;
        if (perf.audience > 30) {
          unityAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        unityAmount = 30000;
        if (perf.audience > 20) {
          unityAmount += 10000 + 500 * (perf.audience - 20);
        }
        unityAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`unknown type: ${getPlayFrom(perf).type}`);
    }
    return unityAmount;
  }

  function benefitsProgram(perf) {
    // soma créditos por volume
    volumeCredits += Math.max(perf.audience - 30, 0);
    // soma um crédito extra para cada dez espectadores de comédia
    if ("comedy" === getPlayFrom(perf).type) volumeCredits += Math.floor(perf.audience / 5);
  }

  function addPerformanceToInvoice(perf, thisAmount) {
    // exibe a linha para esta requisição
    result += ` ${getPlayFrom(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
  }

  function finishInvoiceAndPrintResult(){
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
  }


}
module.exports = { statement };