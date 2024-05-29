import { RequestHandler } from 'express'
import { socksDb } from '../../db/db'

export const postSocks: RequestHandler = async (req, res) => {
  const sock = req.body
  await socksDb.push('/socks', sock)
  res.status(200).json({msg: 'Sock added!'});
}


export const putSocks: RequestHandler = async (req, res) => {
  const toUpdate = req.body
  const socks = await socksDb.getObject<any[]>('/socks')
  const updatedSocks = socks.filter(sock => sock.id !== toUpdate.id)
  await socksDb.push('/socks', updatedSocks.concat([toUpdate]), true)
  res.status(200).json({msg: 'Sock updated!'});
}


export const deleteSocks: RequestHandler = async (req, res) => {
  const toDeleteId = +req.params.id
  const socks = await socksDb.getObject<any[]>('/socks')
  const updatedSocks = socks.filter(sock => sock.id !== toDeleteId)
  await socksDb.push('/socks', updatedSocks, true)
  res.status(200).json({msg: 'Sock deleted!'});
}
