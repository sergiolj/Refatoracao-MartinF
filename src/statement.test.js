const { statement } = require('./statement.js');

describe('statement characterization tests', ()=>{
    it('should match the exact existing output for a complex invoice', ()=>{

        const plays = {
            "hamlet": {name: "Hamlet", type: "tragedy"},
            "as-like": {name: "As You Like It", type: "comedy"},
            "othello": {name: "Othello", type: "tragedy"}
        };
        const invoice = {
            customer: "BigCo",
            performances: [
                {playID: "hamlet", audience: 55},
                {playID: "as-like", audience: 35},
                {playID: "othello", audience: 40}
            ]
        };

        const result = statement(invoice, plays);
        expect(result).toMatchSnapshot();
});

    it('should throw an error when an unknown play type is provided', ()=>{
       const invoice = {
           customer: "ErrorCo",
           performances: [
               {playID:"unknown-play", audience: 20}
           ]
       };
       const plays ={
           "unknown-play": {name: "Unknown Play", type: "musical"}
       };

        expect(() => {
            statement(invoice, plays);
        }).toThrow("unknown type: musical");
    });

});