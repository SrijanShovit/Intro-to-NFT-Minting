const { ethers } = require("hardhat");

async function main(){
  const MyNFT = await ethers.getContractFactory("MyNFT");

  //Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT.deploy();
  console.log("Contract deployed at:",myNFT.address);//0xE224097c41f2D49582ceA2b958c20e3aA175fD40
}

main()
.then(()=>process.exit(0))
.catch((error)=>{
  console.error(error)
  process.exit(1)
})
