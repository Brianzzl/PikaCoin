const PikaSwap = artifacts.require("PikaSwap");
const Token = artifacts.require("Token");

module.exports = async function(deployer) {
  //Deploy Token and PikaSwap

  await deployer.deploy(Token);
  const token = await Token.deployed();

  await deployer.deploy(PikaSwap, token.address);
  const pikaSwap = await PikaSwap.deployed();

  //Transfer all token to PikaSwap
  await token.transfer(pikaSwap.address, "1000000000000000000000000");
};
