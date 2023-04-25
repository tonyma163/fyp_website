//https://hardhat.org/tutorial/deploying-to-a-live-network

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Game01 = await ethers.getContractFactory("Game01");
  const nft = await Game01.deploy();

  console.log("NFT address:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });