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
    nationContract.balanceOf(process.env.VENATION_ADDRESS),
    nationContract.balanceOf(process.env.DAO_AGENT_ADDRESS),
    nationContract.balanceOf(process.env.DAO_CRITICAL_AGENT_ADDRESS)
  ])

  const [totalSupply, veNationSupply, daoAgentSupply, daoCriticalAgentSupply] = supplies

  const circulatingSupply = totalSupply.sub(veNationSupply).sub(daoAgentSupply).sub(daoCriticalAgentSupply)

  response.status(200).send(ethers.utils.formatUnits(circulatingSupply, 18))
}
