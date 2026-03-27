import { getAll, getById, create, updateById, deleteById } from '../store.js'
import { writeFileSync } from 'fs'
import { join } from 'path'

// import { describe, it, expect, beforeEach, afterAll } from '@jest/globals'
const dbpath = join(process.cwd(), 'db.json')
const restoreDb = () => writeFileSync(dbpath, JSON.stringify([]))
const populateDb = (data) => writeFileSync(dbpath, JSON.stringify(data))

const fixtures = [{ id: 1, message: 'Hello' }, { id: 2, message: 'World' }]
const inventedId = 12345
const existingId = fixtures[0].id

describe('Store', () => {
  beforeEach(() => populateDb(fixtures))
  afterAll(() => restoreDb())
  // Here we will write tests for all the functions in store.js
  // the tests for getAll function
  describe('getAll', () => {
    it('should return an empty array when there is no data', async () => {
      restoreDb()
      const data = await getAll()
      expect(data).toEqual([])
    })

    it('should return an array with two items when there are two items', async () => {
      const data = await getAll()
      expect(data).toEqual(fixtures)
    })
  })
  // the tests for getById function
  describe('getById', () => {
    it('Should return undefined when there is no item with the given id', async () => {
      const item = await getById(inventedId)
      expect(item).toBeUndefined()
    })
    it('Should return the item with the given id', async () => {
      const item = await getById(fixtures[0].id)
      expect(item).toEqual(fixtures[0])
    })
  })
  // the tests for create function
  describe('create', () => {
    it('Should return the created item', async () => {
      const newItem = { id: fixtures.length + 1, message: 'test 3' }
      const item = await create(newItem.message)
      expect(item).toEqual(newItem)
    })
    it('Should add the new item to the data', async () => {
      const newItem = { id: fixtures.length + 1, message: 'test 3' }
      const { id } = await create(newItem.message)
      const item = await getById(id)
      expect(item).toEqual(newItem)
    })
  })
  // the tests for updateById function
  describe('updateById', () => {
    it('Should return undefined when there is no item with the given id', async () => {
      const item = await updateById(inventedId)
      expect(item).toBeUndefined()
    })
    it('Should not return the updated item', async () => {
      const updatedItem = { id: existingId, message: 'updated' }
      const item = await updateById(updatedItem.id, updatedItem.message)
      expect(item).toBeUndefined()
    })
    it('Should update the item in the db', async () => {
      const updatedItem = { id: existingId, message: 'updated' }
      await updateById(updatedItem.id, updatedItem.message)
      const item = await getById(existingId)
      expect(item).toEqual(updatedItem)
    })
  })
  // the tests for deleteById function
  describe('deleteById', () => {
    it('Should return undefined when there is no item with the given id', async () => {
      const item = await deleteById(inventedId)
      expect(item).toBeUndefined()
    })
    it('Should not return the deleted item', async () => {
      const item = await deleteById(existingId)
      expect(item).toBeUndefined()
    })
    it('Should delete the item from the db', async () => {
      await deleteById(existingId)
      const items = await getAll()
      expect(items).toEqual(fixtures.filter(item => item.id !== existingId))
    })
  })
})
