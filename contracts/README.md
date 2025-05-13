# Voting System on Celo

This project implements a decentralized voting system using Solidity smart contracts, deployed on the Celo Alfajores testnet. It consists of a `VotingFactory` contract to create `Voting` contracts, each representing a single proposal with customizable options, deadlines, and age restrictions. The project uses Foundry for development, testing, and deployment.

## Project Structure

- `src/`
  - `Voting.sol`: Contract for a single voting proposal.
  - `VotingFactory.sol`: Factory contract to deploy and manage Voting contracts.
  - `IVoting.sol`: Interface for the Voting contract.
  - `IVotingFactory.sol`: Interface for the VotingFactory contract.
- `test/VotingTest.t.sol`: Test suite for the contracts.
- `.env_example`: Template for environment variables.

## Prerequisites

- **Foundry**: Install Foundry by following the [official instructions](https://book.getfoundry.sh/getting-started/installation).
- **Node.js**: Optional, for managing dependencies if needed.
- **Celo Wallet**: A funded wallet for the Celo Alfajores testnet (get testnet funds from [Celo Faucet](https://faucet.celo.org)).
- **Git**: For cloning the repository.

## Setup

1. **Clone the Repository**:

   ```bash
   git clone <your-repository-url>
   cd voting-system
   ```

2. **Install Dependencies**: Ensure Foundry is installed. Verify with:

   ```bash
   forge --version
   ```

3. **Configure Environment Variables**:

   - Copy the `.env_example` file to `.env`:

     ```bash
     cp .env_example .env
     ```

   - Edit `.env` to add your private key and Celo testnet RPC URL:

     ```
     PRIVATE_KEY=0x<your_private_key_here>
     CELO_TESTNET_RPC_URL=https://alfajores-forno.celo-testnet.org
     ```

     **Note**: The `PRIVATE_KEY` must include the `0x` prefix (e.g., `0x123...`). Never commit your `.env` file; ensure it’s in `.gitignore`.

4. **Compile the Contracts**:

   ```bash
   forge build
   ```

## Running Tests

The project includes a comprehensive test suite in `test/VotingTest.t.sol`. To run the tests:

```bash
forge test
```

For verbose output (to see test logs):

```bash
forge test -vv
```

The tests cover:

- Admin management (adding/removing admins).
- Blacklist functionality for VotingFactory.
- Voting constraints (deadline, multiple votes, invalid options).
- Voting contract creation and vote counting.

## Deploying to Celo Alfajores Testnet

1. **Ensure Funding**:

   - Fund your deployer wallet with testnet CELO or cUSD using the [Celo Faucet](https://faucet.celo.org).
   - Verify the private key in `.env` corresponds to the funded wallet and includes the `0x` prefix.

2. **Source Environment Variables**:

   - Load the `.env` file to make environment variables available:

     ```bash
     source .env
     ```

3. **Deploy VotingFactory**: Deploy the `VotingFactory` contract to the Celo Alfajores testnet using `forge create`:

   ```bash
   forge create --rpc-url $CELO_TESTNET_RPC_URL \
       --private-key $PRIVATE_KEY \
       src/VotingFactory.sol:VotingFactory
   ```

   - `--rpc-url`: Uses the RPC URL from `.env`.
   - `--private-key`: Uses the private key from `.env`.
   - No `--constructor-args` are needed, as `VotingFactory` has no constructor arguments.

4. **Output**:

   - The command outputs the deployer address, deployed contract address, and transaction hash.

5. **Deployment Details**:

   - **Deployer**: `0xdeF12008061B9eB7137128CA354Aebc9816b0f6B`
   - **Deployed to**: `0xBFcf9f3a0B597c3407d51f03C8164c26d0fdbd35`
   - **Transaction hash**: `0x622ac355bc57c06a1a05dcde38eb9079998e769fcd701aee66305ac00625f1b6`
   - https://celo-alfajores.blockscout.com/tx/0x622ac355bc57c06a1a05dcde38eb9079998e769fcd701aee66305ac00625f1b6

## Project Details

- **Contracts**:

  - `VotingFactory`: Manages creation of `Voting` contracts and blacklists addresses from creating new contracts.
  - `Voting`: Represents a single proposal with customizable options, deadline, and optional age restrictions.
  - Interfaces (`IVoting`, `IVotingFactory`) provide a clean API for external integration.

- **Features**:

  - Anyone can create a voting contract unless blacklisted.
  - Voting supports single or multiple-choice options.
  - Deadline-based voting with optional age constraints (placeholder for oracle integration).
  - Admin management for blacklist control.

- **Testing**:

  - Tests cover all major functionality, including edge cases and reverts.
  - Use `forge test` to ensure contract correctness.