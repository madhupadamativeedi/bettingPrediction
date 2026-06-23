const usersbet = require("../moduls/usersbet");
const ParityRecord = require("../moduls/parityRecodersModul");


const userBetController = async (req, res) => {
  const { betRecoredID, userBetOnRed, userBetOnGreen } = req.body;

  try {
    const userId = req.user.id;



    const ParityRecordId = await ParityRecord.findOne().sort({_id: -1});


    const userBet = await  new usersbet({
      userId,
      betRecoredID,
      userBetOnRed,
      userBetOnGreen,
    });

    await userBet.save();
    await userBet.populate("betRecoredID");
   

    res.status(201).json({ message: "Bet placed successfully", userBet });
  } catch (error) {
    console.error("Error placing bet:", error);
    res
      .status(500)
      .json({ message: "Failed to place bet", error: error.message });
  }
};

module.exports = { userBetController };
