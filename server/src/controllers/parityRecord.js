const ParityRecord = require("../moduls/parityRecodersModul");
const BetRecord = require("../moduls/betRecors");
const usersbet = require("../moduls/usersbet");
const timmer = require("../utils/constants");

const parity = (req, res) => {
  let time = timmer;

  setInterval(async () => {
    try {
      
      const userBets = await usersbet.find().sort({_id:-1});

      const latestParityRecord = await ParityRecord.findById({_id:userBets[0].betRecoredID });
      const totalRedBet = userBets.reduce((sum, bet) => {
        return sum + (Number(bet.userBetOnRed) || 0);
      }, 0);

      const totalGreenBet = userBets.reduce((sum, bet) => {
        return sum + (Number(bet.userBetOnGreen) || 0);
      }, 0);
      const newBetRecord = await new BetRecord({
        betRecoredID:await ParityRecord.findOne().sort({_id:-1}),
       betONRed: totalRedBet,
       betOnGreen :totalGreenBet
      });
      await newBetRecord.save();
      await newBetRecord.populate("betRecoredID");
      console.log(newBetRecord,"newBetRecordnewBetRecordnewBetRecordnewBetRecordnewBetRecord")
      
      let count = await ParityRecord.countDocuments();
      const newDate = new Date();
      const year = newDate.getFullYear().toString();
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const day = String(newDate.getDate()).padStart(2, "0");
      const time = newDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      let newrecord = count.toString().padStart(3, "0");

      const todaydate = `${year}${month}${day}`;

      if (time === "00:06" || time === "12:00") {
        count = 0;
        newrecord = count.toString().padStart(3, "0");
      } else {
        newrecord = (count + 1).toString().padStart(3, "0");
      }

      let newprice = Math.min(newBetRecord.betONRed, newBetRecord.betOnGreen);
      if (newBetRecord.betONRed > newBetRecord.betOnGreen) {
        let even = [2, 4, 6, 8, 0];
        const randomNumber = even[Math.floor(Math.random() * even.length)];
        const newPriceNumber = String(
          Math.floor(
            Math.random() *
              (newBetRecord.betONRed - newBetRecord.betOnGreen + 1) +
              newBetRecord.betONRed,
          ),
        );
        newprice = newPriceNumber + randomNumber;
      } else if (newBetRecord.betOnGreen > newBetRecord.betONRed) {
        let odd = [1, 3, 5, 7, 9];
        const randomNumber = String(
          odd[Math.floor(Math.random() * odd.length)],
        );
        const newPriceNumber = String(
          Math.floor(
            Math.random() *
              (newBetRecord.betOnGreen - newBetRecord.betONRed + 1) +
              newBetRecord.betOnGreen,
          ),
        );
        newprice = newPriceNumber + randomNumber;
      }

      const newnumber = Number(newprice) % 10;

      let result = "red";

      if (newnumber % 2 === 0) {
        if (newnumber === 0) {
          result = "red purple";
        } else {
          result = "red";
        }
      } else {
        if (newnumber === 5) {
          result = "green purple";
        } else {
          result = "green";
        }
      }

      const NewtotalReacore = todaydate + newrecord;

      const newparityRecord = new ParityRecord({
        date: todaydate,
        record: newrecord,
        price: newprice,
        number: newnumber,
        result,
        totalReacore: NewtotalReacore,
      });
      await newparityRecord.save();
      console.log("Parity record saved successfully:", newparityRecord);

      const deleteLastBet = await BetRecord.findOne().sort({_id: -1})
      if (deleteLastBet) {
    const delet  = await BetRecord.findByIdAndDelete(deleteLastBet._id);
    console.log(delet,"deletdeletdeletdeletdeletdeletdelet jjjjjj")
}
      console.log(deleteLastBet,"deleteLastBetdeleteLastBetdeleteLastBet")


    } catch (error) {
      console.error("Error saving parity record:", error);
    }
  }, (time*1000)); // 10,000 milliseconds = 10 seconds
};

const totalRecords = async (req, res) => {
  try {
    const totalRecords = await ParityRecord.find().sort({_id:-1});
    res.status(200).json({
      msg: "Total Records fetched successfully",
      totalRecords,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { parity, totalRecords };
