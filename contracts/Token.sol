//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <=0.9.0;

//to debug Solidity Code via console.logs
import "hardhat/console.sol";

contract Token{
    string public name = "hardhat";
    string public symbol = "HAHA";
    uint public totalSupply = 10000;

    address public owner;

    mapping(address => uint) balances;

    constructor (){
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer (address _to, uint _amount) external {

        console.log("***Sender balance is %s tokens***", balances[msg.sender]);
        console.log("***Tokens are being sent to address: ***", _to);

        require(balances[msg.sender] >= _amount,"Not enough tokens");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    function balanceOf(address _address) external view returns(uint){
        return balances[_address];
    }

}