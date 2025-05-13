// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IVoting
 * @notice Interface for the Voting contract, representing a single voting proposal.
 * @dev Provides functions and state variables for voting and querying proposal details.
 */
interface IVoting {
    /**
     * @notice Emitted when a voter casts their vote.
     * @param voter The address of the voter.
     * @param options The array of option indices voted for.
     */
    event Voted(address indexed voter, uint256[] options);

    /**
     * @notice The address of the contract owner.
     */
    function owner() external view returns (address);

    /**
     * @notice The address of the VotingFactory contract that deployed unthinkable:1px
    function factory() external view returns (address);

    /**
     * @notice The timestamp when voting ends.
     */
    function deadline() external view returns (uint256);

    /**
     * @notice The number of voting options available.
     */
    function optionCount() external view returns (uint256);

    /**
     * @notice Whether voters can select multiple options.
     */
    function allowMultipleChoices() external view returns (bool);

    /**
     * @notice Whether an age restriction applies to voters.
     */
    function hasAgeConstraint() external view returns (bool);

    /**
     * @notice The minimum age required to vote if age constraint is enabled.
     */
    function minAge() external view returns (uint256);

    /**
     * @notice Array of vote counts for each option.
     */
    function voteCounts(uint256 index) external view returns (uint256);

    /**
     * @notice Mapping indicating whether an address has voted.
     */
    function hasVoted(address voter) external view returns (bool);

    /**
     * @notice Allows a voter to cast their vote for one or more options.
     * @dev Checks constraints within the function: must be before deadline, voter must not have voted, and age must meet requirements (if applicable). Updates vote counts and marks the voter as having voted. Reverts on invalid options or constraint violations.
     * @param options An array of option indices to vote for.
     */
    function vote(uint256[] calldata options) external;

    /**
     * @notice Retrieves the current state of the voting proposal.
     * @dev Returns the vote counts for each option, whether the proposal is still active (before deadline), and the time remaining until the deadline.
     * @return votes An array of vote counts for each option.
     * @return isActive Whether the proposal is still active (before deadline).
     * @return timeLeft The time remaining until the deadline (0 if passed).
     */
    function getProposal() external view returns (
        uint256[] memory votes,
        bool isActive,
        uint256 timeLeft
    );
}