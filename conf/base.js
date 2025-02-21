module.exports = {
    domains: {
            wireguard: {
                domain: 'wireguard.teeseng.uk',
                cloudflareDnsId: "ea93b6859cff64c4574a54912897a1f1",
                zoneId: "11f8ec3c2ff0530fe6f1b97dfe4b8f74",
                baseUrl: "https://api.cloudflare.com/client/v4/zones/",
                apiToken: '__secrets.js__'
            },
            
            proxy: {
                domain: 'proxy.teeseng.uk',
                cloudflareDnsId: "149403c78d119aecdfcde0bc97998b8e",
                zoneId: "11f8ec3c2ff0530fe6f1b97dfe4b8f74",
                baseUrl: "https://api.cloudflare.com/client/v4/zones/",
                apiToken: '__secrets.js__'

            },

        }
}



