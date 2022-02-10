const ecdsa = require("js-ecdsa")

const config = {
    curve: '521', // P-521
    hash: '512', // SHA-512
    digest: 'hex', // hexadecimal
    data: 'test'
}

//generate p-521 ecdsa keypair
ecdsa.gen(config.curve, function (err, gen) {
    if (err) { return console.log(err) }
    console.log(gen)

    //sign some data
    ecdsa.sign(gen.private, config.data, config.hash, config.digest, function (err, sig) {
        if (err) { return console.log(err) }
        console.log(sig)

        //verify signature
        ecdsa.verify(gen.public, sig, config.data, config.hash, config.digest, function (err, res) {
            if (err) { return console.log(err) }
            if (res) {
                return console.log('ecdsa test pass')
            }
            return console.log('ecdsa test fail')
        })
    })
})