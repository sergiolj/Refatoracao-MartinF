function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.volumeCredits = totalVolumeCredits(statementData);

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = getPlayFrom(result);
    result.amount = calculateAmountForEach(result);
    result.volumeCredits = calculateCreditsForBenefitsProgram(result);
    return result;
  }

  function getPlayFrom(aPerformance) {
    return plays[aPerformance.playID];
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

  function calculateCreditsForBenefitsProgram(aPerformance) {
    let volumeCredits = 0;
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === aPerformance.play.type)
      volumeCredits += Math.floor(aPerformance.audience / 5);
    return volumeCredits;
  }

  function totalAmount(data) {
    let result = 0;
    for (let aPerformance of data.performances) {
      result += aPerformance.amount; // Agora apenas lê o valor já calculado!
    }
    return result;
  }

  function totalVolumeCredits(data) {
    let result = 0;
    for (let aPerformance of data.performances) {
      result += aPerformance.volumeCredits; // Apenas lê o valor já calculado!
    }
    return result;
  }

  return renderPlainText(statementData, plays);
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;
  for (let aPerformance of data.performances) {
    result += ` ${aPerformance.play.name}: ${toUSD(aPerformance.amount)} (${aPerformance.audience} seats)\n`;
  }
  result += `Amount owed is ${toUSD(data.totalAmount)}\n`;
  result += `You earned ${data.volumeCredits} credits\n`;

  return result;

  function toUSD(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}
module.exports = { statement };