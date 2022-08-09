import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ethers, BigNumber } from 'ethers'
import dotenv from 'dotenv'
import ERC20 from '../abis/ERC20.json'

dotenv.config()

export default async (request: VercelRequest, response: VercelResponse) => {
  const provider = ethers.getDefaultProvider(1, {
    alchemy: process.env.ALCHEMY_ID,
    infura: process.env.INFURA_ID,
    etherscan: process.env.ETHERSCAN_ID,
    quorum: 1,
  })

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)

  const nationContract = new ethers.Contract(
    process.env.NATION_ADDRESS as string,
    ERC20.abi,
    signer
  )

  const totalSupply = await nationContract.totalSupply()

  response.status(200).send(ethers.utils.formatUnits(totalSupply, 18))
}
