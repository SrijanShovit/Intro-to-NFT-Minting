require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// console.log(JSON.stringify(contract.abi));

const contractAddress = "0xE224097c41f2D49582ceA2b958c20e3aA175fD40";

// //getting instance of contract
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// //create transaction
async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

    const txn = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    }

    //code to sign transaction
    const signPromise = web3.eth.accounts.signTransaction(txn, PRIVATE_KEY)

    signPromise
        .then((signedTxn) => {
            web3.eth.sendSignedTransaction(
                signedTxn.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        )
                    } else {
                        console.log(
                            "something went wrong when submitting your transaction:", err
                        )
                    }
                }
            )
        })
        .catch((err)=>{
            console.log("Promise failed:",err)
        })

    }
    
mintNFT("https://gateway.pinata.cloud/ipfs/QmYNVfXC4zkXHRoSy6rFHjo6RyhG8qy4fDzdembbcVwEgQ");