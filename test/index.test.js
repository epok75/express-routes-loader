'use strict'

const path = require('path')
const loader = require('../lib/index')

const routesFolder = `${__dirname}/routes/`

describe('#index', () => {
  describe('#arguments', () => {
    describe('#failure', () => {
      it('should throw if no arg is passed', () => {
        expect(loader).toThrow()
      })

      it('should throw if a string is passed as arg', () => {
        expect(() => loader('test')).toThrow(Error)
      })

      it('should throw if array is empty', () => {
        expect(() => loader([])).toThrow(Error)
      })

      it('should throw if directory doesn\'t exist', () => {
        expect(() => loader([path.join(__dirname, 'unknow'), 'api'])).toThrow(Error)
      })
    })

    describe('#success', () => {
      it('should work when targetted one specific directory', () => {
        const result = loader([`${routesFolder}/v1`])
        expect(result).toHaveLength(2)
        expect(result[0].url).toEqual('/import/')
      })

      it('should successfully load all routes with the good prefix', () => {
        const result = loader([`${routesFolder}/v1`, 'api'])
        expect(result).toHaveLength(2)
        expect(result[0].url).toEqual('/api/import/')
      })

      it('should successfully load all routes with the good prefix', () => {
        const result = loader([`${routesFolder}/v1`, 'api', 'v1'])
        expect(result).toHaveLength(2)
        expect(result[0].url).toEqual('/api/v1/import/')
      })

      it('should successfully load all routes from multiple directories', () => {
        const result = loader([routesFolder])
        expect(result).toHaveLength(6)
        expect(result[0].url).toEqual('/hello/')
      })

      it('should successfully load all routes from multiple directories with the good prefix', () => {
        const result = loader([routesFolder, 'api'])
        expect(result).toHaveLength(6)
        expect(result[0].url).toEqual('/api/hello/')
      })

      it('should successfully load all routes from multiple directories with the good prefix', () => {
        const result = loader([routesFolder, 'api', 'v1'])
        expect(result).toHaveLength(6)
        expect(result[0].url).toEqual('/api/v1/hello/')
      })

      it('[multiple input] should successfully load all routes from multiple directories', () => {
        const routes = [
          [`${routesFolder}/v1`],
          [`${routesFolder}/v2`]
        ]

        const result = loader(routes)
        expect(result).toHaveLength(4)
        expect(result[0].url).toEqual('/import/')
      })

      it('[multiple input] should successfully load all routes from multiple directories with the good prefix', () => {
        const routes = [
          [`${routesFolder}/v1`, 'api'],
          [`${routesFolder}/v2`, 'users']
        ]

        const result = loader(routes)
        expect(result).toHaveLength(4)
        expect(result[0].url).toEqual('/api/import/')
        expect(result[2].url).toEqual('/users/hello/')
      })

      it('[multiple input] should successfully load all routes from multiple directories with the good prefix', () => {
        const routes = [
          [`${routesFolder}/v1`, 'api', 'v1'],
          [`${routesFolder}/v2`, 'users', 'v1']
        ]

        const result = loader(routes)
        expect(result).toHaveLength(4)
        expect(result[0].url).toEqual('/api/v1/import/')
        expect(result[2].url).toEqual('/users/v1/hello/')
      })
    })
  })
})
