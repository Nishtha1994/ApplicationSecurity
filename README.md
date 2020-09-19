## Web Application Fix:
1. Re-visit your web application and review for web vulnerabilities as well as an app from one other student. Please use the forums to find another student to pair with. 
2. Update your app to mitigate the issues found from step 2 and document the changes made, as well as your reasoning for the changes you've chosen. 
3. Produce a write up of the vulnerabilities you've found in your fellow student's app. You do not need to update their app as they will be doing this themselves. 
4. Explanations should be around 1-3 paragraphs per submission.
5. Total Document should be around 3-4 pages.

## OSS Assesment report:
1. what your app does
2. what its internals look like
2a. good code? good design?
2b. 3rd party libraries?
3. what is its attack surface
4. what did you look at and why, how
5. observations and recommendations for fixes
6. conclusions
6a. what you would have done differently 
6b. overall impressions
7. references

## Reverse Engineering:
Often, in the course of assessment, you will come across some binary without a source. The rest of application depends on this binary - an executable or a library - but you need to evaluate it to ensure that the application uses it in a secure way. Other times it is possible that a vulnerability can emerge from compiled code but immediately visible from source code. So, in this assignment you will flex you reserve engineering skills.
Please go to https://challenges.re/ or http://crackmes.cf/ and pick a binary with difficulty level of 2 or above and write up your RE process and result. Code screenshots are useful for this. If after a long effort you find yourself stuck and unable to proceed, then do write up what you have and attempt another executable. I want to see at least 3 attempts before completely giving up.
If you have completely given up then be sure to fully explain what you've done, where you're stuck and what you feel is preventing you from moving on.

IDAPro for reversing
https://www.hex-rays.com/products/ida/support/download_freeware.shtml(Options->general->disassembly tab-> auto comments  checkbox)
x86 manual
http://www.intel.com/content/www/us/en/processors/architectures-software-developer-manuals.html