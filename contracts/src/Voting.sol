// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IVotingFactory {
    // No functions needed in the interface
}

contract Voting {
    address public owner;
    address public factory;
    uint256 public deadline;
    uint256 public optionCount;
    bool public allowMultipleChoices;
    bool public hasAgeConstraint;
    uint256 public minAge;
    uint256[] public voteCounts;
    mapping(address => bool) public hasVoted;

    event Voted(address indexed voter, uint256[] options);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    /**
     * @notice Initializes a new voting contract for a single proposal.
     * @dev Sets up the voting parameters and initializes the vote counts array. Reverts if option count is zero or deadline is in the past.
     * @param _factory The address of the VotingFactory contract.
     * @param _deadline The timestamp when voting ends.
     * @param _optionCount The number of voting options available.
     * @param _allowMultipleChoices Whether voters can select multiple options.
     * @param _hasAgeConstraint Whether an age restriction applies to voters.
     * @param _minAge The minimum age required to vote if age constraint is enabled.
     */
    constructor(
        address _factory,
        uint256 _deadline,
        uint256 _optionCount,
        bool _allowMultipleChoices,
        bool _hasAgeConstraint,
        uint256 _minAge
    ) {
        require(_optionCount > 0, "Option count must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        owner = msg.sender;
        factory = _factory;
        deadline = _deadline;
        optionCount = _optionCount;
        allowMultipleChoices = _allowMultipleChoices;
        hasAgeConstraint = _hasAgeConstraint;
        minAge = _minAge;
        voteCounts = new uint256[](_optionCount);
    }

    /**
     * @notice Retrieves the age of a voter for age restriction checks.
     * @dev Placeholder function returning a default age for testing. Should be replaced with an oracle or off-chain data in production.
     * @param voter The address of the voter.
     * @return The age of the voter.
     */
    function getVoterAge(address voter) internal pure returns (uint256) {
        // For testing, return a default age; in production, use an oracle
        return 18;
    }

    /**
     * @notice Allows a voter to cast their vote for one or more options.
     * @dev Validates the vote against the proposal's constraints: must be before deadline, voter must not have voted, and age must meet requirements (if applicable). Updates vote counts and marks the voter as having voted. Reverts on invalid options or constraint violations.
     * @param options An array of option indices to vote for.
     */
    function vote(uint256[] calldata options) external {
        require(block.timestamp <= deadline, "Voting deadline has passed");
        require(!hasVoted[msg.sender], "Already voted");
        if (hasAgeConstraint) {
            require(getVoterAge(msg.sender) >= minAge, "Voter age below minimum");
        }

        if (!allowMultipleChoices) {
            require(options.length == 1, "Multiple choices not allowed");
        } else {
            require(options.length > 0, "At least one option must be selected");
        }

        for (uint256 i = 0; i < options.length; i++) {
            require(options[i] < optionCount, "Invalid option index");
            voteCounts[options[i]]++;
        }
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, options);
    }

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
    ) {
        uint256 time = block.timestamp > deadline ? 0 : deadline - block.timestamp;
        return (
            voteCounts,
            block.timestamp <= deadline,
            time
        );
    }
}