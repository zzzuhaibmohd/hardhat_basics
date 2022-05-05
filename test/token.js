const {expect} = require("chai");
const { ethers } = require("hardhat");

// "beforeEach" is used to initialize all the required variables at the beginning
// The updated variables within scope of "it()" is local, not global 
// "expect()" is used at the end of each test case to verify the results

describe("Token contract", function(){

    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function(){

        Token = await ethers.getContractFactory("Token"); //creats the instance of "Token" contract
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners(); //initialize the owner and other addresses
        hardhatToken = await Token.deploy(); //deploys the "Token" contract

    });

    describe("Deployment", function(){

        it("Should set the right owner", async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })

        it("Deployment should assign the total supply to owner", async function(){
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        })
    
    });

    describe("Transactions", function(){

        it("Should check transfer tokens between accounts", async function(){
    
            await hardhatToken.transfer(addr1.address, 1000);
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);    
            expect(await addr1Balance).to.equal(1000);  
            
            await hardhatToken.connect(addr1).transfer(addr2.address, 500);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(await addr2Balance).to.equal(500);
        })

        it("Should fail if sender does not have enough tokens", async function(){

            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect(
                hardhatToken.connect(addr1).transfer(owner.address, 100)
            ).to.be.revertedWith("Not enough tokens");
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);

        })

        it("Should update balances after transfers", async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

            await hardhatToken.transfer(addr1.address, 1000);
            await hardhatToken.transfer(addr2.address, 2000); 

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);

            expect(await finalOwnerBalance).to.equal(initialOwnerBalance - 3000);

            expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1000);
            expect(await hardhatToken.balanceOf(addr2.address)).to.equal(2000);
            
        })

    });

});
