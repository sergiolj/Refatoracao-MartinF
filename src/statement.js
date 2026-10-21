function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    thisAmount = calculateAmount(perf, play);

    benefitsProgram(perf, play);


    // exibe a linha para esta requisição
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

  function benefitsProgram(perf, play) {
    // soma créditos por volume
    volumeCredits += Math.max(perf.audience - 30, 0);
    // soma um crédito extra para cada dez espectadores de comédia
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
  }

  function calculateAmount(perf, play) {
    let unityAmount = 0;
    switch (play.type) {
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
        throw new Error(`unknown type: ${play.type}`);
    }
    return unityAmount;
  }

}




module.exports = { statement };