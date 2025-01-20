export function isPalindrome(num) {
    let str = num.toString();
    return str === str.split('').reverse().join('');
}

export function isPerfectPalinception(num) {
    // Convert number to string
    const str = num.toString();

    // Check if the length of the number is divisible by any number of parts (from 2 up to the length of the number)
    const length = str.length;

    // Function to check if a substring is palindrome
    const isPalindrome = (s) => s === s.split('').reverse().join('');

    // Function to check if the string can be split into repeated palindrome parts
    const splitAndCheck = (parts) => {
        const partLength = length / parts;
        const firstPart = str.substring(0, partLength);
        if (!isPalindrome(firstPart)) return false;

        for (let i = 1; i < parts; i++) {
            const part = str.substring(i * partLength, (i + 1) * partLength);
            if (part !== firstPart || !isPalindrome(part)) {
                return false;
            }
        }
        return true;
    };

    // Check for repetitions of palindromes starting from 2 up to the length of the string
    for (let i = 2; i <= length; i++) {
        if (length % i === 0 && splitAndCheck(i)) {
            return true;
        }
    }

    return false;
}

export function isUniformPalinception(num) {
    let str = num.toString();
    let length = str.length;

    // Try splitting the number into segments of size 3 to 5
    for (let len = 3; len <= 5; len++) {
        if (length % len === 0) {
            let numSegments = length / len;
            let allPalindromes = true;

            for (let i = 0; i < numSegments; i++) {
                let segment = str.slice(i * len, (i + 1) * len);
                if (!isPalindrome(segment)) {
                    allPalindromes = false;
                    break;
                }
            }

            // Check if the whole number is also a palindrome
            if (allPalindromes && isPalindrome(num)) {
                return true;
            }
        }
    }

    return false;
} 