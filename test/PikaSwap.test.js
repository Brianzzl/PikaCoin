const Token = artifacts.require("Token");
const PikaSwap = artifacts.require("PikaSwap");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("PikaSwap", ([deployer, investor]) => {
  let token, pikaSwap;

  before(async () => {
    token = await Token.new();
    pikaSwap = await PikaSwap.new(token.address);
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

  describe("buyTokens()", async () => {
    let result;

    before(async () => {
      result = await pikaSwap.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether"),
      });
    });

    it("Allow user to buy 100 token with 1 ether", async () => {
      //Check Investor balance
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("100"));

      // Check exchange balance
      let pikaSwapBalance;
      pikaSwapBalance = await token.balanceOf(pikaSwap.address);
      assert.equal(pikaSwapBalance.toString(), tokens("999900"));
      pikaSwapBalance = await web3.eth.getBalance(pikaSwap.address);
      assert.equal(pikaSwapBalance.toString(), web3.utils.toWei("1", "Ether"));

      // console.log(result.logs[0]);
      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens("100").toString());
      assert.equal(event.rate.toString(), "100");
    });
  });

  describe("sellTokens()", async () => {
    let result;

    before(async () => {
      //Need investor to approve the purchse
      await token.approve(pikaSwap.address, tokens("100"), { from: investor });
      result = await pikaSwap.sellTokens(tokens("100"), { from: investor });
    });

    it("Allow user to sell token to exchange", async () => {
      //Check Investor balance
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("0"));

      // Check exchange balance
      let pikaSwapBalance;
      pikaSwapBalance = await token.balanceOf(pikaSwap.address);
      assert.equal(pikaSwapBalance.toString(), tokens("1000000"));
      pikaSwapBalance = await web3.eth.getBalance(pikaSwap.address);
      assert.equal(pikaSwapBalance.toString(), web3.utils.toWei("0", "Ether"));
    });
  });
  //
});
