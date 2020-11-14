// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.12;

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";

contract Escrow is Initializable {
    address payable public seller;
    address public intermediate;
    address payable public buyer;
    uint256 public price;

    bool public isSold = false;
    uint256 public houseId;
    string public houseAddress;
    uint256 public payTimeLimit;
    
    modifier onlyIntermediate() {
        require(msg.sender == intermediate, "Only intermediate can call the function");
        _;
    }

    event NewBuyer(address buyer);
    event RemoveBuyer(address buyer);
    event TransferFundsToSeller(address seller, uint256 value);
    event Payment(address payer, uint256 value);

    function initialize(
        address payable seller_,
        address intermediate_,
        uint256 houseId_,
        string memory houseAddress_,
        uint256 price_
    ) public initializer {
        seller = seller_;
        intermediate = intermediate_;
        houseId = houseId_;
        houseAddress = houseAddress_;
        price = price_;
    }

    function becomeBuyer() public {
        require(buyer == address(0), "There is alredy a buyer");
        require(isSold == false, "The house is already sold");
        payTimeLimit = block.timestamp + 3 days;
        buyer = msg.sender;

        emit NewBuyer(buyer);
    }
    
    function removeBuyer() public {
        require(block.timestamp >= payTimeLimit, "The buyer still has time to pay");
        require(isSold == false, "The house is already sold");

        address payable oldBuyer = buyer;
        buyer = address(0);
        _payBackToBuyer(oldBuyer);

        emit RemoveBuyer(oldBuyer);
    }
    
    function transferFundsToSeller() onlyIntermediate public {
        require(address(this).balance >= price, "The buyer has not payed enough");
        isSold = true;
        emit TransferFundsToSeller(seller, address(this).balance);
        seller.transfer(address(this).balance);
    }

    receive() external payable {
        require(msg.sender == buyer, "Only buyer can send Ether");
        emit Payment(msg.sender, msg.value);
    }
    
    function _payBackToBuyer(address payable oldBuyer) internal {
        oldBuyer.transfer(address(this).balance);
    }
}
