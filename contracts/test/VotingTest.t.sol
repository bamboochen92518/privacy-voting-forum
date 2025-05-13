// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/VotingFactory.sol";
import "../src/Voting.sol";

contract VotingTest is Test {
    VotingFactory factory;
    Voting voting;
    address owner = address(0x1);
    address admin = address(0x2);
    address voter1 = address(0x3);
    address voter2 = address(0x4);

    uint256 deadline;
    uint256 optionCount = 3;
    bool allowMultipleChoices = true;
    bool hasAgeConstraint = false;
    uint256 minAge = 18;

    function setUp() public {
        vm.prank(owner);
        factory = new VotingFactory();
        deadline = block.timestamp + 1 days;
        vm.prank(owner);
        address votingAddress = factory.createVotingContract(
            deadline,
            optionCount,
            allowMultipleChoices,
            hasAgeConstraint,
            minAge
        );
        voting = Voting(votingAddress);
    }

    function test_AddAdmin() public {
        vm.prank(owner);
        factory.addAdmin(admin);
        assertTrue(factory.admins(admin));
    }

    function test_ExpectRevertAddAdminNonOwner() public {
        vm.prank(admin);
        vm.expectRevert("Only owner can perform this action");
        factory.addAdmin(admin);
    }

    function test_ExpectRevertAddExistingAdmin() public {
        vm.prank(owner);
        factory.addAdmin(admin);
        vm.prank(owner);
        vm.expectRevert("Address is already an admin");
        factory.addAdmin(admin);
    }

    function test_RemoveAdmin() public {
        vm.prank(owner);
        factory.addAdmin(admin);
        vm.prank(owner);
        factory.removeAdmin(admin);
        assertFalse(factory.admins(admin));
    }

    function test_ExpectRevertRemoveNonAdmin() public {
        vm.prank(owner);
        vm.expectRevert("Address is not an admin");
        factory.removeAdmin(admin);
    }

    function test_ExpectRevertRemoveOwnerAdmin() public {
        vm.prank(owner);
        vm.expectRevert("Cannot remove owner as admin");
        factory.removeAdmin(owner);
    }

    function test_SetBlacklist() public {
        vm.prank(owner);
        factory.addAdmin(admin);
        vm.prank(admin);
        factory.setBlacklist(voter1, true);
        assertTrue(factory.blacklist(voter1));
    }

    function test_ExpectRevertSetBlacklistNonAdmin() public {
        vm.prank(voter1);
        vm.expectRevert("Only admin can perform this action");
        factory.setBlacklist(voter1, true);
    }

    function test_CreateVotingContract() public {
        vm.prank(voter1);
        address newVoting = factory.createVotingContract(
            deadline,
            optionCount,
            allowMultipleChoices,
            hasAgeConstraint,
            minAge
        );
        address[] memory contracts = factory.getVotingContracts();
        assertEq(contracts.length, 2); // One from setUp, one from this test
        assertEq(contracts[1], newVoting);
    }

    function test_ExpectRevertCreateVotingContractBlacklisted() public {
        vm.prank(owner);
        factory.setBlacklist(voter1, true);
        vm.prank(voter1);
        vm.expectRevert("Address is blacklisted");
        factory.createVotingContract(
            deadline,
            optionCount,
            allowMultipleChoices,
            hasAgeConstraint,
            minAge
        );
    }

    function test_Vote() public {
        uint256[] memory options = new uint256[](2);
        options[0] = 0;
        options[1] = 1;

        vm.prank(voter1);
        voting.vote(options);

        (uint256[] memory votes, bool isActive, ) = voting.getProposal();
        assertEq(votes[0], 1);
        assertEq(votes[1], 1);
        assertEq(votes[2], 0);
        assertTrue(isActive);
    }

    function test_ExpectRevertVoteAfterDeadline() public {
        uint256[] memory options = new uint256[](1);
        options[0] = 0;

        vm.warp(deadline + 1); // Move past deadline
        vm.prank(voter1);
        vm.expectRevert("Voting deadline has passed");
        voting.vote(options);
    }

    function test_ExpectRevertVoteTwice() public {
        uint256[] memory options = new uint256[](1);
        options[0] = 0;

        vm.prank(voter1);
        voting.vote(options);
        vm.prank(voter1);
        vm.expectRevert("Already voted");
        voting.vote(options);
    }

    function test_ExpectRevertVoteInvalidOption() public {
        uint256[] memory options = new uint256[](1);
        options[0] = optionCount; // Invalid index

        vm.prank(voter1);
        vm.expectRevert("Invalid option index");
        voting.vote(options);
    }
}