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

    modifier onlyHolder(address nft, uint256 mateId) {
        require(IKIP17(nft).ownerOf(mateId) == msg.sender);
        _;
    }

    function exists(string calldata name) view external returns (bool) {
        return _exists[name];
    }

    function set(address nft, uint256 mateId, string calldata name) onlyHolder(nft, mateId) external {
        require(_exists[name] != true);

        if (named[nft][mateId] == true) {
            _exists[names[nft][mateId]] = false;
            mix.burnFrom(msg.sender, mixForChanging);
        } else {
            named[nft][mateId] = true;
        }

        names[nft][mateId] = name;
        _exists[name] = true;

        emit Set(nft, mateId, msg.sender, name);
    }

    function importFromV1(address nft, uint256 mateId, string calldata name) onlyOwner external {
        require(_exists[name] != true);

        if (named[nft][mateId] == true) {
            _exists[names[nft][mateId]] = false;
        } else {
            named[nft][mateId] = true;
        }

        names[nft][mateId] = name;
        _exists[name] = true;

        emit Set(nft, mateId, msg.sender, name);
    }

    function remove(address nft, uint256 mateId) onlyHolder(nft, mateId) external {

        delete _exists[names[nft][mateId]];
        delete names[nft][mateId];
        delete named[nft][mateId];

        mix.burnFrom(msg.sender, mixForDeleting);

        emit Remove(nft, mateId, msg.sender);
    }
}
