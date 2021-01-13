const { json } = require('express');
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

    getListRepo(username) {
        this.options.path = "/users/" + username + "/repos";
        return new Promise((resolve, reject) => {
            https.get(this.options, (res) => {
                let data = '';
                res.setEncoding('utf8');
                res.on('data', (resp) => {
                    data += resp.toString();
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
        const lists = await this.getListRepo(username);
        
        const response = JSON.parse(lists);
        if(response.length > 0) {
            let list = [];
            await Promise.all(response.map(async(items) => {
                const name = items.name;
                const url = items.html_url;
                const createdAt = items.created_at;
                const updatedAt = items.updated_at;
                list.push({
                    name, url, createdAt, updatedAt
                });
            }));
            return {
                status : true,
                message : list
            };
        } else {
            return {
                status : false,
                message : "NO_REPOSITORY"
            };
        }
    }

    getRepo(path) {
        this.options.path = "/repos/" + path;
        return new Promise((resolve, reject) => {
            https.get(this.options, (res) => {
                let data = '';
                res.setEncoding('utf8');
                res.on('data', (resp) => {
                    data += resp.toString();
                });
                res.on('end', () => {
                    resolve(data);
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
    }

    async getRepository(path) {
        const lists = await this.getRepo(path);
        
        const response = JSON.parse(lists);
        
        const description = response.description;
        const owner_name = response.owner.login;
        const forkCount = response.forks;
        const starsCount = response.stargazers_count;

        return {
            status : true,
            message : {
                description, owner_name, forkCount, starsCount
            }
        };
    }
}

module.exports = Restfull;