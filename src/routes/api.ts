import { Router, Request, Response } from 'express'

const api: Router = Router()

api.get('/', (req: Request, res: Response) => res.sendStatus(200))
api.get('/total-supply', (req: Request, res: Response) => {
  res.send(req.app.locals.totalSupply)
})

export default api
