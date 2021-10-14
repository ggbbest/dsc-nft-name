pragma solidity ^0.5.6;

import "./klaytn-contracts/token/KIP17/IKIP17.sol";
import "./klaytn-contracts/ownership/Ownable.sol";
import "./klaytn-contracts/math/SafeMath.sol";
import "./interfaces/IDSCNFTName.sol";
import "./interfaces/IMix.sol";

contract DSCNFTName is Ownable, IDSCNFTName {
    using SafeMath for uint256;

    address public constant V1 = 0x12C591fCd89B83704541B1Eac6b4aA18063A6954;
    IMix public mix;

    constructor(IMix _mix) public {
        mix = _mix;
    }

    uint256 public mixForChanging = 100 * 1e18;
    uint256 public mixForDeleting = 200 * 1e18;

    mapping(address => mapping(uint256 => string)) public names;
    mapping(address => mapping(uint256 => bool)) public named;
    mapping(string => bool) public _exists;

    function setMixForChanging(uint256 _mix) onlyOwner external {
        mixForChanging = _mix;
        emit SetMixForChanging(_mix);
    }

    function setMixForDeleting(uint256 _mix) onlyOwner external {
        mixForDeleting = _mix;
        emit SetMixForDeleting(_mix);
    }

    modifier onlyHolder(address mates, uint256 mateId) {
        require(IKIP17(mates).ownerOf(mateId) == msg.sender);
        _;
    }

    function exists(string calldata name) view external returns (bool) {
        return _exists[name];
    }

    function set(address mates, uint256 mateId, string calldata name) onlyHolder(mates, mateId) external {
        require(_exists[name] != true);

        if (named[mates][mateId] == true) {
            _exists[names[mates][mateId]] = false;
            mix.burnFrom(msg.sender, mixForChanging);
        } else {
            named[mates][mateId] = true;
        }

        names[mates][mateId] = name;
        _exists[name] = true;

        emit Set(mates, mateId, msg.sender, name);
    }

    function remove(address mates, uint256 mateId) onlyHolder(mates, mateId) external {

        delete _exists[names[mates][mateId]];
        delete names[mates][mateId];
        delete named[mates][mateId];

        mix.burnFrom(msg.sender, mixForDeleting);

        emit Remove(mates, mateId, msg.sender);
    }
}
