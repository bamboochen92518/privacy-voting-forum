// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IVotingFactory
 * @notice Interface for the VotingFactory contract, managing the creation and administration of voting contracts.
 * @dev Provides functions for creating voting contracts, managing blacklists, and administering permissions.
 */
interface IVotingFactory {
    /**
     * @notice Emitted when a new voting contract is created.
     * @param votingContract The address of the new Voting contract.
     * @param creator The address that created the voting contract.
     */
    event VotingContractCreated(address indexed votingContract, address creator);

    /**
     * @notice Emitted when an address's blacklist status is updated.
     * @param user The address whose blacklist status was updated.
     * @param status True if the address was blacklisted, false if removed.
     */
    event BlacklistStatusUpdated(address indexed user, bool status);

    /**
     * @notice Emitted when an address is added to the admin list.
     * @param admin The address added as an admin.
     */
    event AdminAdded(address indexed admin);

    /**
     * @notice Emitted when an address is removed from the admin list.
     * @param admin The address removed as an admin.
     */
    event AdminRemoved(address indexed admin);

    /**
     * @notice The address of the contract owner.
     */
    function owner() external view returns (address);

    /**
     * @notice Mapping indicating whether an address is blacklisted from creating voting contracts.
     */
    function blacklist(address user) external view returns (bool);

    /**
     * @notice Mapping indicating whether an address is an admin.
     */
    function admins(address admin) external view returns (bool);

    /**
     * @notice Array of all voting contract addresses created by this factory.
     */
    function votingContracts(uint256 index) external view returns (address);

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
    ) external returns (address);

    /**
     * @notice Updates the blacklist status of an address.
     * @dev Adds or removes an address from the blacklist, controlling their ability to create voting contracts. Only callable by admins.
     * @param user The address to update.
     * @param status True to blacklist the address, false to remove from blacklist.
     */
    function setBlacklist(address user, bool status) external;

    /**
     * @notice Adds an address to the admin list.
     * @dev Grants admin privileges to the specified address, allowing them to manage the blacklist. Only callable by the owner.
     * @param admin The address to add as an admin.
     */
    function addAdmin(address admin) external;

    /**
     * @notice Removes an address from the admin list.
     * @dev Revokes admin privileges from the specified address. The owner cannot be removed. Only callable by the owner.
     * @param admin The address to remove as an admin.
     */
    function removeAdmin(address admin) external;

    /**
     * @notice Retrieves the list of all voting contracts created by this factory.
     * @dev Returns an array of addresses for all deployed Voting contracts.
     * @return An array of Voting contract addresses.
     */
    function getVotingContracts() external view returns (address[] memory);
}