pragma solidity ^0.5.6;

import "../klaytn-contracts/token/KIP17/IKIP17.sol";

interface IDSCNFTName {

    event SetMixForChanging(uint256 _mix);
    event SetMixForDeleting(uint256 _mix);

    event Set(address indexed mates, uint256 indexed mateId, address indexed owner, string name);
    event Remove(address indexed mates, uint256 indexed mateId, address indexed owner);

    function V1() view external returns (address);
    function mix() view external returns (IKIP17);
    function mixForChanging() view external returns (uint256);
    function mixForDeleting() view external returns (uint256);

    function names(address mates, uint256 mateId) view external returns (string memory name);
    function named(address mates, uint256 mateId) view external returns (bool);
    function exists(string calldata name) view external returns (bool);
    function set(address mates, uint256 mateId, string calldata name) external;
    function remove(address mates, uint256 mateId) external;
}
