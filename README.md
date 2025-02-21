# CloudFlare DNS Updater

This project is designed to update a CloudFlare DNS record with your current public IP address if it changes. The script checks your public IP address and compares it with the IP address currently set in the DNS record. If the IPs are different, it updates the DNS record with the new IP.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/cloudflare-dns-updater.git
    cd cloudflare-dns-updater
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Create a `secret.js` file in the conf folder of your project directory and add your CloudFlare API token and other secrets:

https://www.npmjs.com/package/@simpleworkjs/conf


2. Run the script:

    ```bash
    node your-script-file.js
    ```
### Script Flow

1. The script fetches your current public IP using the [wtfismyip](https://wtfismyip.com/json) API.
2. It retrieves the current IP address set in the specified DNS record from CloudFlare.
3. If the IP addresses do not match, it updates the DNS record with the new public IP.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
