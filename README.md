🔒 SealSecurityAssignment
🕵️‍♂️ Researching on the Vulnerability: CVE-2023-26136
📌 Description
Versions of the package tough-cookie before 4.1.3 are vulnerable to Prototype Pollution due to improper handling of cookies when using CookieJar in rejectPublicSuffixes=false mode. This issue arises from the way objects are initialized.

🔗 CVE Details: CVE-2023-26136

🛠️ Introduction
❓ What is Prototype Pollution?
JavaScript uses objects as key-value stores, where each object can contain properties of various types (string, boolean, int, etc.). These objects inherit properties through their prototype chain.

Prototype Pollution is an attack where an attacker manipulates an object’s prototype to inject unintended properties or methods. By doing so, the attacker can modify the behavior of existing objects, potentially leading to security vulnerabilities.

🔗 Preventing Prototype Pollution:
A recommended mitigation strategy is to initialize objects with a null prototype:

const obj = Object.create(null);
This prevents unintended inheritance and mitigates the vulnerability.

🍪 What are Cookies?
Cookies are small pieces of data stored on a user’s device to track session state, authentication, and preferences. Websites use cookies to maintain user sessions, but improper handling can lead to security risks.

🔗 More on Cookies: Kaspersky Resource Center

🏺 What is CookieJar?
CookieJar is an object used to store and manage cookies. It ensures proper storage, retrieval, and expiration of cookies in web applications.

🛠️ The Assignment
⚠️ The Vulnerability
The CVE-2023-26136 vulnerability exists due to the way Tough-Cookie initializes cookies in CookieJar. Since cookies are stored as objects, they become susceptible to Prototype Pollution, allowing an attacker to inject properties that could manipulate application logic.

🔥 The Risks
An attacker exploiting this vulnerability could:

Access unauthorized data
Execute remote code
Cause Denial of Service (DoS)
Hijack user sessions (if cookies are used for authentication)
Extract sensitive cookie data
🛠️ The Patch
The vulnerability was avoided by modifying the storage mechanism in memstore.js.

📝 Code Fix:
Instead of using:
this.idx = {};
The patched version now initializes the object with a null prototype:
this.idx = Object.create(null);
✅ Why is this important?
By explicitly setting Object.create(null), the object does not inherit from JavaScript’s prototype chain, effectively preventing Prototype Pollution.

🧪 Test Suite
The patch was verified using the test suite of the project to ensure that:

The vulnerability is properly mitigated.
The existing functionality remains unaffected.
📝 Running the Test Suite
The following command was used to run the tests:
npm test
Test Results:
656 honored 3 broken
Explanation of Failed Tests:
After reviewing the output, it was determined that the 3 failed tests were already failing in the original version of tough-cookie v2.5.0 before the patch was applied.
Therefore, these tests were not directly related to the vulnerability fix and were left unchanged.

🧪 Unit Test to Verify the Vulnerability Fix
A unit test was added to verify that the vulnerability is fixed. The test ensures that the Prototype Pollution issue cannot be exploited in the patched version of tough-cookie.

Test Results for Patched Version:
659 honored 3 broken
📄 Changes.diff
The changes.diff file contains the differences between the original tough-cookie v2.5.0 and the patched version.

🛠️ Testing the Vulnerability (index.js)
The index.js file is intended to demonstrate the Prototype Pollution vulnerability in the original version of tough-cookie v2.5.0, as well as show how the vulnerability is avoided in the fixed version.

🚀 Running the Exploit & Patch
1️⃣ Running the Exploit
Run the following command to install the vulnerable version and execute the exploit:
npm install tough-cookie@2.5.0; node index.js
Expected Output:
EXPLOITED SUCCESSFULLY
2️⃣ Running the Patched Version
After applying the fix, run:
npm install ./tough-cookie-2.5.0-PATCHED.tgz; node index.js
Expected Output:
EXPLOIT FAILED
🏆 Summary
This project highlights the dangers of Prototype Pollution in tough-cookie and provides a practical demonstration of how the vulnerability can be exploited and mitigated.

📌 For more details, check the full research in the repository. 🚀