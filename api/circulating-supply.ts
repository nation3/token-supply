import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ethers, BigNumber } from 'ethers'
import dotenv from 'dotenv'
import ERC20 from '../abis/ERC20.json'

dotenv.config()

export default async (request: VercelRequest, response: VercelResponse) => {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth')

  const nationContract = new ethers.Contract(
    process.env.NATION_ADDRESS as string,
    ERC20.abi,
    provider
  )

  const supplies: BigNumber[] = await Promise.all([
    nationContract.totalSupply(),
    nationContract.balanceOf(process.env.TREASURY_ADDRESS),
    nationContract.balanceOf(process.env.VENATION_ADDRESS),
  ])

  const [totalSupply, treasurySupply, veNationSupply] = supplies

  const circulatingSupply = totalSupply.sub(treasurySupply).sub(veNationSupply)

  response.status(200).send(ethers.utils.formatUnits(circulatingSupply, 18))
}
