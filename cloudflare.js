"use strict";
const config = require("@simpleworkjs/conf");
const axios = require("axios");
require("dotenv").config();

// # Flow of my program
// # first get IP records of the current WG domain name from CF
// # if the IP and my current Public IP is different i should use CF API and update it

class CloudFlare {
	// constructor(apiToken, zoneId, baseUrl) {
	// 	this.apiToken = apiToken;
	// 	this.zoneId = zoneId;
	// 	this.baseUrl = baseUrl;
	// }
	constructor(config) {
		this.config = config
		this.apiToken = process.env.API_TOKEN
	}
	//write the logic to comapre both public ip if one is different or blah update accordingly
	async compareIP() {
		try {
			if (this.getIP() !== this.getDNS()) {
				//call updateDNS
				const newIP = await this.getIP();
				this.updateDNS(newIP);
			}
		} catch (error) {
			console.log(error);
		}
	}

	//To get DNS RECORD ID.
	// async getAllDNS(){

	//     try {
	//         const options = {
	//         method: 'GET',
	//         url: `${this.baseUrl}${this.zoneId}/dns_records`,
	//         headers: {
	//                 'Content-Type': 'application/json',
	//                 'Authorization': "Bearer " + this.apiToken
	//             }
	//         };
	//         let cfRes = await axios.request(options)
	//         console.log(cfRes.data.result)

	//     } catch (error) {
	//         console.log(error.response); // this is the main part. Use the response property from the error object
	//     }

	// }

	//Use as helper by compareIp()
	async getIP() {
		try {
			const res = await axios.get("https://wtfismyip.com/json");
			console.log(res.data.YourFuckingIPAddress);
			return res.data.YourFuckingIPAddress;
		} catch (error) {
			console.log(error.response);
		}
	}
	async getDNS(domainName) {
		try {
			const subDomain = domainName.split('.')[0];
			const options = {
				method: "GET",
				url: `${config.domains baseUrl}/${this.zoneId}/dns_records/${config.domains+ "." + subDomain.cloudflare_Dns_Id}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + this.apiToken
				},
			};
			let cfRes = await axios.request(options);
			console.log(cfRes)
			return cfRes.data.result.content; // will return ip currently being used by the subdomain
		} catch (error) {
			console.log(error.response);
		}
	}

	//the logic will be called in compareIP
	async updateDNS(ip) {
		try {
			//required!
			// content
			// name
			// type
			// comment

			const options = {
				method: "PATCH",
				url: `${this.baseUrl}${this.zoneId}/dns_records/${process.env.DNS_RECORD_ID}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + this.apiToken,
				},
				data: {
					content: ip,
					name: "wireguard.teeseng.uk",
					type: "A",
					comment: "For WG VPN purposes",
				},
			};
			let cfRes = await axios.request(options);
		} catch (error) {
			console.log(error.response);
		}
	}
}

module.exports = CloudFlare;

if (require.main === module) {
	(async function () {
		//write a for loop that runs through my subdomains?
		try {
			const domainValues = Object.values(config.domains).map(
				(obj) => obj.domain
			);
			// console.log(config)

			// const domainValues = Object.values(config.domains)
			// console.log(domainValues[0])

			//for loop
			for (let domainName of domainValues) {
				// console.log(domainName)
				//write a logic to compare ip for domain in the loop
				//need to pass 
				let cloudflare = new CloudFlare(config);
				cloudflare.getDNS(domainName)


			}

			let cloudflare = new CloudFlare();
			// process.env.API_TOKEN,
			// process.env.ZONE_ID,
			// process.env.BASE_URL
			// cloudflare.getAllDNS()
			// cloudflare.compareIP()
			// cloudflare.getIP()
		} catch (error) {
			console.log("IIFE Error:", error);
		}
	})();
}

// if (require.main === module) {
//     (async function () {
//         try {
//           for(let domain of secrets.domain){
//               let cloudflare = new CloudFlare(
//                   domain.API_TOKEN,
//                   domain.ZONE_ID,
//                   domoain.BASE_URL
//               );
//               cloudflare.compareIP()
//             // cloudflare.getIP()
//           }
//         } catch (error) {
//             console.log("IIFE Error:", error);
//         }
//     })();
// }
