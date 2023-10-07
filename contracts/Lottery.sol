pragma solidity ^0.4.17;

contract Lottery {
    address public manager; // Seve the manager address
    address[] public players; // Save the players address
    
    // Constructor
    function Lottery() public {
        manager = msg.sender;
    }
    
    // Enter the lottery, must send more than .01 ether - transaction
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    // Return a very big random number
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    // Pick a winner for the current lottery and send him all the money, reset the players array - transaction
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0);
    }
    
    // Modifier to restrict the access to the manager
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    // Return the players array
    function getPlayers() public view returns (address[]) {
        return players;
    }
}   