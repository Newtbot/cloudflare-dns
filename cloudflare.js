"use strict";
const axios = require("axios");
require("dotenv").config();

// # Flow of my program
// # first get IP records of the current WG domain name from CF
// # if the IP and my current Public IP is different i should use CF API and update it

class CloudFlare {
	constructor(apiToken, zoneId, baseUrl) {
		this.apiToken = apiToken;
		this.zoneId = zoneId;
		this.baseUrl = baseUrl;
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
	//         // console.log(`${this.baseUrl}${this.zoneId}/dns_records`)
	//         let cfRes = await axios.request(options)
	//         console.log(cfRes.data.result.id)

	//     } catch (error) {
	//         console.log(error.response); // this is the main part. Use the response property from the error object
	//     }

	// }

	async getIP() {
		try {
			const res = await axios.get("https://wtfismyip.com/json");
			// console.log(res.data.YourFuckingIPAddress);
            return res.data.YourFuckingIPAddress;
		} catch (error) {
			console.log(error.response.status);
			console.log(error.response.statusText);
			console.log(error.response);
		}
	}
	async getDNS() {
		//to get individual domain details you would need dns_record_id which can only be obtained from list all domain??
		// console.log(this.apiToken , this.zoneId)
		try {
			const options = {
				method: "GET",
				url: `${this.baseUrl}${this.zoneId}/dns_records/${process.env.DNS_RECORD_ID}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + this.apiToken,
				},
			};
			let cfRes = await axios.request(options);
			// console.log(cfRes.data.result.content); //PUBLIC IP
            return cfRes.data.result.content; // will return ip currently being used by the subdomain
		} catch (error) {
			console.log(error.response.status);
			console.log(error.response.statusText);
			console.log(error.response); // this is the main part. Use the response property from the error object
		}
	}
	//write the logic to comapre both public ip if one is different or blah update accordingly
	async compareIP() {
		try {
			if (this.getIP() !== this.getDNS()){
				//call updateDNS
				const newIP = await this.getIP();
				this.updateDNS(newIP)
			}

		} catch (error) {
			console.log(error.response.status);
			console.log(error.response.statusText);
			console.log(error.response); // this is the main part. Use the response property from the error object
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
				data:{
					content: ip,
					name: "wireguard.teeseng.uk",
					type:"A",
					comment:"For WG VPN purposes"
				}
			};
			let cfRes = await axios.request(options);
		} catch (error) {
			console.log(error.response.status);
			console.log(error.response.statusText);
			console.log(error.response); // this is the main part. Use the response property from the error object
		}
	}
}

module.exports = CloudFlare;

if (require.main === module) {
	(async function () {
		try {
			let cloudflare = new CloudFlare(
				process.env.API_TOKEN,
				process.env.ZONE_ID,
				process.env.BASE_URL
			);
			cloudflare.compareIP()
		} catch (error) {
			console.log("IIFE Error:", error);
		}
	})();
}
