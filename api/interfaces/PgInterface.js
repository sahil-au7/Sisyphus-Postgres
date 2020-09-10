import enums from '../enums/pgEnum'
import Factory from '../utilities/modelFactory'
import Error from '../errorHandlers/CustomError'

class PgInterface {

    constructor(data, model) {
        globalThis.data = data
        globalThis.model = model
    }

    /**
     * Save record
     */
    save = () => new Promise(async (res, rej) => {
        try {
            //Get model and data from global this
            const model = globalThis.model
            const data = globalThis.data

            //Save in db
            const result = await model.create(data)

            res(result)
        } catch (error) {
            console.log(error)
            rej(error)
        }
    })

    /**
     * Initialize options and query
     */
    static init() {
        //Add options and type of query to global this
        globalThis.options = {}
        globalThis.options.include = []
        globalThis.update = {}
        globalThis.returning = {}
        globalThis.bulk = {}
        globalThis.query = ""
    }

    static raw(op) {
        //Options to get result as raw and nested json
        options.raw = op
        options.nest = op
        options.plain = op
    }

    /**
     * Find record matching the criteria
     * 
     * @param {criteria to select} where 
     */
    static findOne(where = {}) {
        this.init()
        this.raw(true)

        //Retrieve only one record
        options.limit = 1

        //Add where query in options
        options.where = where

        //findOne query
        query = enums.findOne

        return this
    }

    static findOneAndUpdate(where = {}, update1 = {}) {
        this.init()
        this.raw(true)

        //Add where query in options
        options.where = where

        //Add update attributes to global this
        update = update1.$set

        //Return updated data
        options.returning = true

        //findOne query
        query = enums.findOneAndUpdate

        return this
    }

    //Find
    static find(where = {}) {
        this.init()

        options.where = where

        //find query
        query = enums.find

        return this
    }

    /**
     * Add attributes to query 
     * 
     * @param {attributest to select} attributes 
     */
    static select(attributes = "") {
        //Add attributes to retrieve
        globalThis.options.attributes = attributes.split(' ')
        return this
    }

    /**
     * Add include to query 
     * 
     * @param {Table to include while querying} include 
     */
    static populate(include = "") {
        this.raw(false)

        //Add tables to include
        options.include.push(include)

        return this
    }

    static lean() {
        return this
    }

    /**
     * Delete one record
     * 
     * @param {where query} where 
     */
    static deleteOne(where = {}) {
        //Add where query in options
        options.where = where

        //deleteOne query
        query = enums.deleteOne

        return this
    }

    /**
     * Insert Data in bulk
     * 
     * @param {data to be inserted in bulk} data 
     */
    static insertMany(data) {
        bulk = data

        //Return updated data
        options.returning = true
        options.plain = true

        //deleteOne query
        query = enums.insertMany

        return this
    }

    /**
     * Raw query
     * 
     * @param {query} query 
     */
    static query(query) {
        return new Promise(async (res, rej) => {
            try {
                const obj = await db.query(query)

                res(obj)
            } catch (error) {
                console.log(error)
                rej(error)
            }
        })
    }

    /**
     * Execute all the promises in the array
     */
    static exec() {
        return new Promise(async (res, rej) => {
            try {
                //Check query type
                switch (query) {
                    //finOne
                    case enums.findOne: {

                        const obj = await Factory(this)
                            .findAll(options)

                        res(obj)

                        break
                    }

                    //findOneAndUpdate
                    case enums.findOneAndUpdate: {
                        const obj = await Factory(this)
                            .update(update, options)

                        if (obj.length === 0) {
                            throw new Error(404, 'No record found')
                        } else {
                            res(obj[1])
                        }

                        break
                    }

                    //deleteOne
                    case enums.deleteOne: {
                        const obj = await Factory(this)
                            .destroy(options)

                        obj > 0 ? res('Deleted') : res('No record found')

                        break;
                    }

                    //insertMany
                    case enums.insertMany: {
                        const obj = await Factory(this)
                            .bulkCreate(bulk)

                        res(obj)

                        break;
                    }

                    //find
                    case enums.find: {
                        const obj = await Factory(this)
                            .findAll(options)

                        res(obj)
                    }

                    default:
                        throw new Error(500, 'Error')
                }
            } catch (error) {
                console.log(error)
                rej(error)
            }
        })
    }
}

export default PgInterface