// Mock API response data - simulates the backend AI Judge service
const MOCK_RESPONSES = [
  {
    problem: "Write the code for factorial in js",
    solution_1: "Here's how you can write the factorial function in JavaScript:\n\n### 1. **Iterative Approach (Loop)**\n```javascript\nfunction factorialIterative(n) {\n    if (n < 0) return \"Factorial is not defined for negative numbers\";\n    let result = 1;\n    for (let i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\n// Example usage:\nconsole.log(factorialIterative(5)); // Output: 120\n```\n\n### 2. **Recursive Approach**\n```javascript\nfunction factorialRecursive(n) {\n    if (n < 0) return \"Factorial is not defined for negative numbers\";\n    if (n === 0 || n === 1) return 1;\n    return n * factorialRecursive(n - 1);\n}\n\n// Example usage:\nconsole.log(factorialRecursive(5)); // Output: 120\n```\n\n### 3. **Using `reduce()` (Functional Approach)**\n```javascript\nconst factorialReduce = (n) => {\n    if (n < 0) return \"Factorial is not defined for negative numbers\";\n    return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, val) => acc * val, 1);\n};\n\n// Example usage:\nconsole.log(factorialReduce(5)); // Output: 120\n```\n\n### 4. **Using `for...of` Loop**\n```javascript\nfunction factorialForOf(n) {\n    if (n < 0) return \"Factorial is not defined for negative numbers\";\n    let result = 1;\n    for (let i of Array.from({ length: n }, (_, i) => i + 1)) {\n        result *= i;\n    }\n    return result;\n}\n\n// Example usage:\nconsole.log(factorialForOf(5)); // Output: 120\n```\n\n### Notes:\n- **Edge Case Handling**: All versions check for negative numbers (factorial is undefined for negatives).\n- **Performance**: The iterative approach is generally faster for large `n` due to no function call overhead.\n- **Recursion Limit**: JavaScript has a recursion depth limit (~`10,000` by default), so recursive solutions may fail for very large `n`.\n\nChoose the one that best fits your needs! 🚀",
    solution_2: "Certainly! Below is a simple JavaScript function to calculate the factorial of a given number using both iterative and recursive approaches.\n\n### Iterative Approach:\n```javascript\nfunction factorialIterative(n) {\n    if (n < 0) return undefined; // Factorial is not defined for negative numbers\n    let result = 1;\n    for (let i = 1; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\n// Example usage:\nconsole.log(factorialIterative(5)); // Output: 120\n```\n\n### Recursive Approach:\n```javascript\nfunction factorialRecursive(n) {\n    if (n < 0) return undefined; // Factorial is not defined for negative numbers\n    if (n === 0 || n === 1) return 1;\n    return n * factorialRecursive(n - 1);\n}\n\n// Example usage:\nconsole.log(factorialRecursive(5)); // Output: 120\n```\n\n### Explanation:\n- **Iterative Approach**: Uses a loop to multiply numbers from 1 to `n`.\n- **Recursive Approach**: Calls itself with `n-1` until it reaches the base case (`n === 0` or `n === 1`), then multiplies the results back up the call stack.\n\nBoth functions handle the edge case where `n` is negative by returning `undefined`, as factorial is not defined for negative numbers.\n\nChoose the approach that best fits your needs!",
    judge: {
      solution_1_score: 9,
      solution_2_score: 9.5,
      solution_1_reasoning: "Solution 1 offers multiple implementations (iterative, recursive, functional with reduce) and includes insightful notes on recursion depth and performance. However, returning an error message string when given a negative number alters the return type (from number to string), which is generally considered poor practice for a mathematical utility function.",
      solution_2_reasoning: "Solution 2 is clean, concise, and focuses on the two most standard paradigms (iterative and recursive). Returning 'undefined' for negative inputs is more idiomatic in JavaScript than returning an error string, making the functions safer for downstream numerical operations."
    }
  },
  {
    problem: "Explain the difference between var, let, and const in JavaScript",
    solution_1: "## var vs let vs const in JavaScript\n\n### `var` — Old School\n```javascript\nvar x = 10;\nvar x = 20; // ✅ Can redeclare\nx = 30;     // ✅ Can reassign\n\nfunction example() {\n  var blockVar = 'inside';\n}\n// console.log(blockVar); // ❌ ReferenceError — function-scoped\n```\n- **Scope**: Function-scoped (NOT block-scoped)\n- **Hoisted**: Yes, initialized to `undefined`\n- **Redeclarable**: Yes\n\n### `let` — Modern Variable\n```javascript\nlet y = 10;\n// let y = 20; // ❌ Cannot redeclare\ny = 30;       // ✅ Can reassign\n\nif (true) {\n  let blockLet = 'block';\n}\n// console.log(blockLet); // ❌ ReferenceError — block-scoped\n```\n- **Scope**: Block-scoped\n- **Hoisted**: Yes, but NOT initialized (Temporal Dead Zone)\n- **Redeclarable**: No\n\n### `const` — Constants\n```javascript\nconst z = 10;\n// z = 20; // ❌ TypeError — cannot reassign\n\nconst obj = { name: 'Alice' };\nobj.name = 'Bob'; // ✅ Object properties CAN change\n```\n- **Scope**: Block-scoped\n- **Hoisted**: Yes, but NOT initialized\n- **Redeclarable**: No, **Reassignable**: No",
    solution_2: "## JavaScript Variable Declarations Explained\n\n| Feature | `var` | `let` | `const` |\n|---------|-------|-------|---------|\n| Scope | Function | Block | Block |\n| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |\n| Redeclare | ✅ | ❌ | ❌ |\n| Reassign | ✅ | ✅ | ❌ |\n\n### Practical Example:\n```javascript\n// Using const for values that won't change\nconst PI = 3.14159;\nconst MAX_SIZE = 100;\n\n// Using let for loop counters\nfor (let i = 0; i < 10; i++) {\n  console.log(i);\n}\n\n// Avoid var in modern JS\nfunction oldWay() {\n  var leaked = 'visible outside block';\n  if (true) {\n    var leaked = 'overwritten!';\n  }\n  console.log(leaked); // 'overwritten!' — surprising!\n}\n```\n\n**Best Practice**: Use `const` by default, use `let` when reassignment is needed, avoid `var` entirely.",
    judge: {
      solution_1_score: 8.5,
      solution_2_score: 9.0,
      solution_1_reasoning: "Solution 1 provides thorough code examples covering each declaration type individually, explaining scope, hoisting, and mutability with clear annotations. However, it lacks a concise summary comparison that could help developers quickly see the differences at a glance.",
      solution_2_reasoning: "Solution 2 excels with its comparison table offering an immediate visual overview, followed by practical code showing real-world usage. The 'Best Practice' tip at the end is particularly valuable for developers making decisions. The table format significantly improves scannability."
    }
  },
  {
    problem: "How to reverse a string in Python?",
    solution_1: "## Reversing a String in Python\n\n### Method 1: Slicing (Most Pythonic)\n```python\ntext = \"Hello, World!\"\nreversed_text = text[::-1]\nprint(reversed_text)  # Output: !dlroW ,olleH\n```\n\n### Method 2: reversed() + join()\n```python\ntext = \"Hello, World!\"\nreversed_text = ''.join(reversed(text))\nprint(reversed_text)  # Output: !dlroW ,olleH\n```\n\n### Method 3: Loop\n```python\ndef reverse_string(s):\n    result = ''\n    for char in s:\n        result = char + result\n    return result\n\nprint(reverse_string(\"Hello\"))  # Output: olleH\n```\n\n### Method 4: Using a Stack\n```python\ndef reverse_with_stack(s):\n    stack = list(s)\n    result = ''\n    while stack:\n        result += stack.pop()\n    return result\n```\n\n**Performance**: Slicing (`[::-1]`) is the fastest and most idiomatic.",
    solution_2: "## String Reversal in Python\n\nThe cleanest way to reverse a string in Python:\n\n```python\n# Method 1: Slice notation (recommended)\ns = \"Hello, World!\"\nprint(s[::-1])  # !dlroW ,olleH\n\n# Method 2: reversed() iterator\nprint(''.join(reversed(s)))  # !dlroW ,olleH\n\n# As a function\ndef reverse(s: str) -> str:\n    return s[::-1]\n\n# Examples\nprint(reverse(\"Python\"))     # nohtyP\nprint(reverse(\"racecar\"))    # racecar (palindrome!)\nprint(reverse(\"\"))           # \"\" (empty string handled)\n```\n\n### Why slicing?\n- **O(n)** time complexity\n- Creates a new string (strings are immutable in Python)\n- Single-line, readable, and idiomatic\n\nFor production code, `s[::-1]` is the go-to solution.",
    judge: {
      solution_1_score: 8.0,
      solution_2_score: 9.0,
      solution_1_reasoning: "Solution 1 covers multiple approaches comprehensively, showing different paradigms including loops and stack-based approaches. Good for educational purposes. However, the variety of methods may overwhelm beginners who just need a quick, definitive answer.",
      solution_2_reasoning: "Solution 2 focuses on the most practical approaches with type hints (modern Python style) and includes good edge case coverage (empty string, palindrome). The explanation of why slicing is preferred adds useful context. More focused and production-ready."
    }
  }
]

// Simulate API latency (1.5–2.5s)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function sendMessage(userMessage) {
  await delay(1500 + Math.random() * 1000)

  // Try to find a matching mock response
  const lowerMsg = userMessage.toLowerCase()
  const matched = MOCK_RESPONSES.find(r =>
    r.problem.toLowerCase().split(' ').some(word => word.length > 3 && lowerMsg.includes(word))
  )

  if (matched) {
    return { ...matched, problem: userMessage }
  }

  // Generic fallback response
  return {
    problem: userMessage,
    solution_1: `## Solution 1 — Approach A\n\nHere's one way to solve: **"${userMessage}"**\n\n\`\`\`javascript\n// Solution approach 1\nfunction solution1(input) {\n  // Implement your logic here\n  return input;\n}\n\nconsole.log(solution1('test'));\n\`\`\`\n\nThis approach is straightforward and handles most common cases efficiently.`,
    solution_2: `## Solution 2 — Approach B\n\nAn alternative way to solve: **"${userMessage}"**\n\n\`\`\`javascript\n// Solution approach 2 - more elegant\nconst solution2 = (input) => {\n  // Alternative implementation\n  return input;\n};\n\nconsole.log(solution2('test'));\n\`\`\`\n\nThis approach uses modern JavaScript patterns for cleaner, more maintainable code.`,
    judge: {
      solution_1_score: 8.0,
      solution_2_score: 8.5,
      solution_1_reasoning: "Solution 1 provides a clear, traditional implementation that is easy to understand and modify. Good readability and straightforward logic makes it suitable for teams prioritizing maintainability.",
      solution_2_reasoning: "Solution 2 leverages modern JavaScript syntax and functional patterns, resulting in more concise code. Better suited for modern codebases and developers comfortable with ES6+ features."
    }
  }
}
