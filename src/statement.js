function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = getPlayFrom(aPerformance);
    result.amount = amountFor(aPerformance);
    return result;
  }

  function getPlayFrom(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {

  }

  return renderPlaiText(statementData, plays);
}

function renderPlaiText(data, plays) {
  let result = addInvoiceHead();
  totalAmount();

  for (let aPerformance of data.performances) {
    let thisAmount = calculateAmountForEach(aPerformance);
    addPerformanceToInvoice(aPerformance, thisAmount);
  }
  volumeCredits();
  addInvoiceFooter();
  return result;

  function addInvoiceHead() {
    return `Statement for ${data.customer}\n`;
  }

  function totalAmount() {
    let totalAmount = 0;
    for (let aPerformance of data.performances) {
      totalAmount += calculateAmountForEach(aPerformance);
    }
    return totalAmount;
  }

  function calculateAmountForEach(aPerformance) {
    let unityAmount = 0;
    switch (aPerformance.play.type) {
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
        throw new Error(`unknown type: ${aPerformance.play.type}`);
    }
    return unityAmount;
  }

  function addPerformanceToInvoice(aPerformance, thisAmount) {
    result += ` ${aPerformance.play.name}: ${toUSD(thisAmount)} (${aPerformance.audience} seats)\n`;
  }

  function toUSD(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function volumeCredits() {
    let volumeCredits = 0;
    for (let aPerformance of data.performances) {
      volumeCredits += calculateCreditsForBenefitsProgram(aPerformance);
    }
    return volumeCredits;
  }

  function calculateCreditsForBenefitsProgram(aPerformance) {
    let volumeCredits = 0;
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type) volumeCredits += Math.floor(aPerformance.audience / 5);
    return volumeCredits;
  }

  function addInvoiceFooter() {
    result += `Amount owed is ${toUSD(totalAmount())}\n`;
    result += `You earned ${volumeCredits()} credits\n`;
  }
}
module.exports = { statement };