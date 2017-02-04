import fs from 'fs'
import path from 'path'
import csv from 'fast-csv'

const pathToCSV = path.join( __dirname, '/meterData/parkingmeters.csv')
const stream = fs.createReadStream(pathToCSV)

const parseMeterData = () => {

  let meterData = [],
    metersArray = []

  const csvStream = csv()
    .on("data", function(data){
      meterData.push(data)
    })
    .on("end", function(){
      meterData.forEach( meter => {
        if ( meter[4] !== 'NO METER FOUND') {
          let meterData = {
            meterId: meter[2],
            address: meter[3],
            latitude: meter[5],
            longitude: meter[6]
          }
          metersArray.push(meterData)
        }
      })
      metersArray.shift()

      const dataPath = path.join( __dirname, '/meterData/data.js')
      fs.writeFile(dataPath, `export default ` + JSON.stringify(metersArray), 'utf-8', error => {
        if ( error ) console.log('Failed to write data file to to /meterData/data.js')
        console.log('Successfuly write to /meterData/data.js')
      })
    })

  stream.pipe(csvStream)
}

parseMeterData()
