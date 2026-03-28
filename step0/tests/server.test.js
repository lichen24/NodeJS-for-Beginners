import supertest from 'supertest';
import { app } from '../server.js';
import { restoreDb, populateDb } from './utils.js';
import { whispers, inventedId, existingId} from './fixtures.js';
import { getById } from '../store.js';
//import { describe } from 'node:test';

describe('Server', () => {
    beforeEach(() => populateDb(whispers))
    afterAll(restoreDb)

    describe("GET/api/v1/whisper", () => {
        it.todo("Should return an empty array when there is no data")
        it.todo("Should return all the whispers")
    })
    describe("GET/api/v1/whisper/:id", () => {
        it.todo("Shoule return a 404 when the whisper doesn't exist") 
        it.todo("Should return a whisper details")
    })
    describe("POST/api/v1/whisper", () => {
        it.todo("Should return a 400 when the body is empty")
        it.todo("Should return a 400 when the body is invalid")
        it.todo("Should return a 201 when the whisper is created")
    })
    describe("PUT/api/v1/whisper/:id", () => {
        it.todo("Should return a 400 when the body is empty")
        it.todo("Should return a 400 when the body is invalid")
        it.todo("Should return a 404 when the whisper doesn't exist")
        it.todo("Should return a 200 when the whisper is updated")
    })
    describe("DELETE/api/v1/whisper/:id", () => {
        it.todo("Should return a 404 when the whisper doesn't exist")
        it.todo("Should return a 200 when the whisper is deleted")
    })  
})
