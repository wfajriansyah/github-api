const https = require('https');
const { resolve } = require('path');

class Restfull {
    constructor() {
        this.options = {
            hostname: 'api.github.com',
            port: 443,
            method: 'GET',
            headers: { 
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type' : 'application/json',
                'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 OPR/73.0.3856.329'
            }
        }
    }
    getRepository(username) {
        this.options.path = "/users/" + username + "/repos";
        return new Promise((resolve, reject) => {
            https.get(this.options, (res) => {
                let data = '';
                res.on('data', (resp) => {
                    data += resp;
                });
                res.on('end', () => {
                    resolve(data);
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }

    async getListRepository(username) {
        const lists = await this.getRepository(username);
        
        console.log(lists)
        // if(lists.length > 0) {
            
        //     // return {
        //     //     status : true,
        //     //     message : lists
        //     // };
        // } else {
        //     return {
        //         status : false,
        //         message : "NO_REPOSITORY"
        //     };
        // }
    }
}

module.exports = Restfull;