const hre = require('hardhat');

const message = "Hi there!";


async function main() {
    const [deployer] = await ethers.getSigners()

    console.log(`Deploying contracts with account:`, deployer.address)
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Inbox = await hre.ethers.getContractFactory("Inbox")
    const inbox = await Inbox.deploy(message)
    await inbox.deployed()
    console.log('Inbox deployed to:', inbox.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
