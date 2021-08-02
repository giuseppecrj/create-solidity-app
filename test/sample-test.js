const { expect } = require("chai");
const { ethers } = require("hardhat");

const message = 'Hi there!'
let accounts;
let inbox;

beforeEach(async function () {
  accounts = await ethers.getSigners();
  const Inbox = await ethers.getContractFactory('Inbox')
  inbox = await Inbox.deploy(message)
  await inbox.deployed()
})

describe('Inbox contract', () => {
  it('deploys a contract', async () => {
    expect(inbox.address).to.exist
  })

  it('has a default message', async () => {
    const msg = await inbox.message()
    expect(msg).to.equal(message)
  })

  it('can change the message', async () => {
    const newMsg = 'bye';
    await inbox.connect(accounts[1]).setMessage(newMsg)

    const msg = await inbox.message()
    expect(msg).to.equal(newMsg)
  })
})

// Inbox.attach(contract)
