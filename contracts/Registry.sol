// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.12;

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";

contract Registry is Initializable {
    address[] public escrowAddrs;
    mapping(uint256 => address) private escrow;

    function getEscrow(uint256 _houseId) public view returns(address) {
        return escrow[_houseId];
    }

    function addEscrow(uint256 _houseId, address _escrow) public {
        require(_escrow != address(0), "Escrow should be non-zero address");
        escrowAddrs.push(_escrow);
        escrow[_houseId] = _escrow;
    }
}
