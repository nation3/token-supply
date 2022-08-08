import express, { Express } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { ethers, BigNumber } from 'ethers'
import dotenv from 'dotenv'
import api from './src/routes/api'
import ERC20 from './src/abis/ERC20.json'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
})

const provider = ethers.getDefaultProvider(1, {
  infura: process.env.INFURA_ID ?? '-',
  alchemy: process.env.ALCHEMY_ID ?? '-',
  etherscan: process.env.ETHERSCAN_ID ?? '-',
  quorum: 1,
})

const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)

const nationContract = new ethers.Contract(
  process.env.NATION_ADDRESS as string,
  ERC20.abi,
  signer
)

nationContract
  .totalSupply()
  .then(
    (totalSupply: BigNumber) =>
      (app.locals.totalSupply = ethers.utils.formatUnits(totalSupply, 18))
  )

app.use(helmet())
app.use(cors())
app.use(limiter)

app.use('/', api)

app.listen(port, () => {
  console.log(`[server]: Server is running on port: ${port}`)
})
