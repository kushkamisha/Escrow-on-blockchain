// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.12;

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";

contract Escrow is Initializable {
    address public seller;
    address public intermediate;
    address public buyer;
    uint256 public price;

    function initialize(
        address _seller,
        address _intermediate,
        uint256 _price
    ) public initializer {
        seller = _seller;
        intermediate = _intermediate;
        price = _price;
    }

    function becomeBuyer() public {
        buyer = msg.sender;
    }

    receive() external payable {
        require(msg.sender == buyer,"Only buyer can send Ether");
    }
}
