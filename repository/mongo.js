const mongoose = require('mongoose')

const password = process.argv[2]

if (!password) {
    console.log('Por favor, proveé la contraseña como argumento: node mongo.js <password>')
    process.exit(1)
}

const url = `mongodb+srv://fullstack:${password}@pdcluster.c5sixfj.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    // only password → show contacts
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    // Password, name and number → save contact
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({ name, number })

    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Uso: node mongo.js <password> [name] [number]')
    mongoose.connection.close()
}
