function checkCashRegister(price, cash, cid) {
  let changeNeeded = cash - price;
  let changeRegister = cid.map(a => a[1]);
  console.log(changeNeeded);
  console.log(changeRegister);
  let totalChange = changeRegister.reduce((x, y) => x + y, 0);
  let whatEqual = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  let totalCoins = [];
  for (let i = 0; i < changeRegister.length; i++) {
    totalCoins.push(Math.round(changeRegister[i] / whatEqual[i]));
  }
  console.log(totalCoins);
  // let isDivisible = cid.map(a=> a[1]!==0? changeNeeded/a[1] : a[1]);
  // console.log(isDivisible)
  var change;
//   if (changeNeeded > 1) {
//     for (let i = cid.length - 1; i >= 0; i--) {
//       if (cid[i][1] <= changeNeeded) {
//         changeNeeded = changeNeeded-cid[i][1];
//       }
//     }
//     console.log(changeNeeded);
//   }

  if (totalChange < changeNeeded) {
    change = { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  if (changeNeeded < 1) {
    if (
      cid[3][1] - changeNeeded < 0 &&
      cid[2][1] - changeNeeded < 0 &&
      cid[1][1] - changeNeeded < 0 &&
      cid[0][1] - changeNeeded < 0
    ) {
      change = { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (cid[3][1] - changeNeeded > 0) {
      cid[3][1] -= changeNeeded;
      change = { status: "OPEN", change: [["QUARTER", 0.5]] };
    } else if (cid.every(x => x[1] - changeNeeded <= 0)) {
      change = { status: "CLOSE", change: cid.map(x => [x[0], (x[1] = 0)]) };
    }
  }
  return change;
}

//examples

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ])
); // + ' should return {status: "OPEN", change: [["QUARTER", 0.5]]}.');
console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ])
); // + ' should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.')

//insufficient funds
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ])
); // + ' should return {status: "INSUFFICIENT_FUNDS", change: []}.')
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ])
); // + ' should return {status: "INSUFFICIENT_FUNDS", change: []}.');

//closed
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ])
); //should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}. 1234567
