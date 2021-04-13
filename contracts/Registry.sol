// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.12;

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";

contract Registry is Initializable {
    address[] public escrowAddrs;

    function getNumOfEscrow() public view returns(uint256) {
        return escrowAddrs.length;
    }

    function addEscrow(address _escrow) public {
        require(_escrow != address(0), "Escrow should be non-zero address");
        escrowAddrs.push(_escrow);
    }
}
