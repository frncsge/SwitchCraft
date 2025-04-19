const feedback = [
  {
    name: "Francis A.",
    text: "SwitchCraft is good. I ordered my keyboard and there was a defect but they were quick to replace it!",
  },
  {
    name: "Santa Claus",
    text: "This is where I shop when I am planning on giving a keyboard nerd some gifts. I recommend 👍",
  },
  {
    name: "Heisenberg",
    text: "I bought Jesse a gift here. Quality stuff 👍 keep on cooking. Recommend. Recommend. Five stars. Excellent service as always.",
  },
  {
    name: "Ryan A.",
    text: "SwitchCraft is perfect if you are a gamer or into customizing keyboards! They almost have it all 👍",
  },
  {
    name: "Raphael R.",
    text: "SC is very quick to respond to my concern. I recommend this shop if you are planning to buy a keyboard and want it right away. They ship faaast",
  },
  {
    name: "Nolan G.",
    text: "This shop is the reason why I don't want the Viltrumites to conquer the earth 👍",
  },
];

const customerName = $(".customer-name");
const customerFeedback = $(".feedback");
const leftBtn = $(".left");
const rightBtn = $(".right");
const feedbackLen = feedback.length;

let leftCardInd = 0;
let centerCardInd = 1;
let rightCardInd = 2;

for (let i = 0; i < 3; i++) {
  customerName.eq(i).html(feedback[i].name);
  customerFeedback.eq(i).html(feedback[i].text);
}

function nextInd(index) {
  //functi0n para ma balik ang number. If 5 na ang index, mo repeat siya sa 0
  return index % feedbackLen;
}

rightBtn.on("click", () => {
  leftCardInd = nextInd(leftCardInd - 1);
  centerCardInd = nextInd(centerCardInd - 1);
  rightCardInd = nextInd(rightCardInd - 1);

  let cardsInd = [leftCardInd, centerCardInd, rightCardInd];

  cardsInd.forEach((cv, i) => {
    customerName.eq(i).html(feedback[cv].name);
    customerFeedback.eq(i).html(feedback[cv].text);
  });
});

leftBtn.on("click", () => {
  leftCardInd = nextInd(leftCardInd + 1);
  centerCardInd = nextInd(centerCardInd + 1);
  rightCardInd = nextInd(rightCardInd + 1);

  let cardsInd = [leftCardInd, centerCardInd, rightCardInd];

  cardsInd.forEach((cv, i) => {
    customerName.eq(i).html(feedback[cv].name);
    customerFeedback.eq(i).html(feedback[cv].text);
  });
});
