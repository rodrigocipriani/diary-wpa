const IS_CLIENT_SIDE = typeof window !== "undefined";

let hostname = "localhost";
if (IS_CLIENT_SIDE) {
  hostname = location.hostname; // eslint-disable-line no-restricted-globals
}

const config = {
  publicUrl: process.env.PUBLIC_URL || `http://${hostname}:3000`
};

// console.log("config", config);

module.exports = config;
