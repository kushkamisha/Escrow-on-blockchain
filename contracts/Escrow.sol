// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

contract Escrow {
    string public name;

    constructor(string memory _name) {
        name = _name;
    }

    function setName(string memory _name) public {
        name = _name;
    }
}
