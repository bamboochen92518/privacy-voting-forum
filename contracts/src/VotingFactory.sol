// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Voting.sol";

contract VotingFactory {
    address public owner;
    mapping(address => bool) public blacklist;
    mapping(address => bool) public admins;
    address[] public votingContracts;

    event VotingContractCreated(address indexed votingContract, address creator);
    event BlacklistStatusUpdated(address indexed user, bool status);
    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admin can perform this action");
        _;
    }

    /**
     * @notice Initializes the VotingFactory contract.
     * @dev Sets the deployer as the owner and the initial admin.
     */
    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true;
    }

    /**
     * @notice Creates a new voting contract for a proposal.
     * @dev Deploys a new Voting contract with the specified parameters and adds it to the votingContracts list. Reverts if the caller is blacklisted.
     * @param deadline The timestamp when voting ends.
     * @param optionCount The number of voting options available.
     * @param allowMultipleChoices Whether voters can select multiple options.
     * @param hasAgeConstraint Whether an age restriction applies to voters.
     * @param minAge The minimum age required to vote if age constraint is enabled.
     * @return The address of the newly created Voting contract.
     */
    function createVotingContract(
        uint256 deadline,
        uint256 optionCount,
        bool allowMultipleChoices,
        bool hasAgeConstraint,
        uint256 minAge
    ) external returns (address) {
        require(!blacklist[msg.sender], "Address is blacklisted");
        Voting newVoting = new Voting(
            address(this),
            deadline,
            optionCount,
            allowMultipleChoices,
            hasAgeConstraint,
            minAge
        );
        votingContracts.push(address(newVoting));
        emit VotingContractCreated(address(newVoting), msg.sender);
        return address(newVoting);
    }

    /**
     * @notice Updates the blacklist status of an address.
     * @dev Adds or removes an address from the blacklist, controlling their ability to create voting contracts. Only callable by admins.
     * @param user The address to update.
     * @param status True to blacklist the address, false to remove from blacklist.
     */
    function setBlacklist(address user, bool status) external onlyAdmin {
        blacklist[user] = status;
        emit BlacklistStatusUpdated(user, status);
    }

    /**
     * @notice Adds an address to the admin list.
     * @dev Grants admin privileges to the specified address, allowing them to manage the blacklist. Only callable by the owner.
     * @param admin The address to add as an admin.
     */
    function addAdmin(address admin) external onlyOwner {
        require(!admins[admin], "Address is already an admin");
        admins[admin] = true;
        emit AdminAdded(admin);
    }

    /**
     * @notice Removes an address from the admin list.
     * @dev Revokes admin privileges from the specified address. The owner cannot be removed. Only callable by the owner.
     * @param admin The address to remove as an admin.
     */
    function removeAdmin(address admin) external onlyOwner {
        require(admins[admin], "Address is not an admin");
        require(admin != owner, "Cannot remove owner as admin");
        admins[admin] = false;
        emit AdminRemoved(admin);
    }

    /**
     * @notice Retrieves the list of all voting contracts created by this factory.
     * @dev Returns an array of addresses for all deployed Voting contracts.
     * @return An array of Voting contract addresses.
     */
    function getVotingContracts() external view returns (address[] memory) {
        return votingContracts;
    }
}