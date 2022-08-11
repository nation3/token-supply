"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
const ERC20_json_1 = __importDefault(require("../abis/ERC20.json"));
dotenv_1.default.config();
exports.default = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = ethers_1.ethers.getDefaultProvider(1, {
        alchemy: process.env.ALCHEMY_ID,
        infura: process.env.INFURA_ID,
        etherscan: process.env.ETHERSCAN_ID,
        quorum: 1,
    });
    const nationContract = new ethers_1.ethers.Contract(process.env.NATION_ADDRESS, ERC20_json_1.default.abi, provider);
    const supplies = yield Promise.all([
        nationContract.totalSupply(),
        nationContract.balanceOf(process.env.TREASURY_ADDRESS),
        nationContract.balanceOf(process.env.VENATION_ADDRESS),
    ]);
    const [totalSupply, treasurySupply, veNationSupply] = supplies;
    const circulatingSupply = totalSupply.sub(treasurySupply).sub(veNationSupply);
    response.status(200).send(ethers_1.ethers.utils.formatUnits(circulatingSupply, 18));
});
