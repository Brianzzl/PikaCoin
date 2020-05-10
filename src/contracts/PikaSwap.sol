pragma solidity >=0.5.0;
import "./Token.sol";


contract PikaSwap {
    string public name = "Pikachill Pokecoin Exchange";
    Token public token;
    uint256 public exchangeRate = 100;

    event TokenPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    // PikaSwap ==> ( token ) =>> buyer
    //buyer =  msg.sender
    function buyTokens() public payable {
        uint256 tokenAmount = msg.value * exchangeRate;

        // Make sure exchange have token
        require(token.balanceOf(address(this)) >= tokenAmount);

        token.transfer(msg.sender, tokenAmount);

        //Emit purchase envent
        emit TokenPurchased(
            msg.sender,
            address(token),
            tokenAmount,
            exchangeRate
        );
    }

    //
}
