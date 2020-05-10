pragma solidity >=0.5.0;
import "./Token.sol";


contract PikaSwap {
    string public name = "Pikachill Pokecoin Exchange";
    Token public token;
    uint256 public exchangeRate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event TokensSold(
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

        //perform purchase
        token.transfer(msg.sender, tokenAmount);

        //Emit purchase envent
        emit TokensPurchased(
            msg.sender,
            address(token),
            tokenAmount,
            exchangeRate
        );
    }

    function sellTokens(uint256 _amount) public {
        require(token.balanceOf(msg.sender) >= _amount);

        // Calculate the amount of Ether to redeem
        uint256 etherAmount = _amount / exchangeRate;

        require(address(this).balance >= etherAmount);

        // Perform sale need 'approve function' for "transferFrom"
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);

        // Emit an event
        emit TokensSold(msg.sender, address(token), _amount, exchangeRate);
    }

    //
}
