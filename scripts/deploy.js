// imports
const { ethers, run, network } = require("hardhat")

// async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  
  await simpleStorage.deployed()
  console.log("Deployed contract to: "+simpleStorage.address)

  // what happens when we deploy to our hardhat network?
  // if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
  //   console.log("Waiting for block confirmations...")
  //   await simpleStorage.deployTransaction.wait(6)
  //   await verify(simpleStorage.address, [])
  // }

  const currentValue = await simpleStorage.retrieve()
  console.log("Current Value is: "+currentValue)

  // Update the current value
  const  tx_store  = await simpleStorage.store(10)
  await tx_store.wait()

  const updatedValue = await simpleStorage.retrieve()
  console.log("Updated Value is: "+updatedValue)
}
//https://kovan.etherscan.io/address/0x6C02C44C5914dedE473371663D57383466F5dFDE
// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
