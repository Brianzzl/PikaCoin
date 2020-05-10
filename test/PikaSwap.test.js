const Token = artifacts.require("Token");
const PikaSwap = artifacts.require("PikaSwap");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("PikaSwap", (accounts) => {
  let token, pikaSwap;

  before(async () => {
    token = await Token.new();
    pikaSwap = await PikaSwap.new();
    // Transfer all tokens to PikaSwap (1 million)
    await token.transfer(pikaSwap.address, tokens("1000000"));
  });

  describe("Token deployment", async () => {
    it("contract has a name", async () => {
      const name = await token.name();
      assert.equal(name, "DApp Token");
    });
  });

  describe("PikaSwap deployment", async () => {
    it("contract has a name", async () => {
      const name = await pikaSwap.name();
      assert.equal(name, "Pikachill Pokecoin Exchange");
    });

    it("contract has tokens", async () => {
      let balance = await token.balanceOf(pikaSwap.address);
      assert.equal(balance.toString(), tokens("1000000"));
    });
  });

  //
});
