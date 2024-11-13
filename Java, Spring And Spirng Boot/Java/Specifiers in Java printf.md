Certainly! Here’s a list of commonly used format specifiers in Java's `printf` method, along with explanations for each.

### Commonly Used Format Specifiers in Java `printf`

| Specifier | Description                                                                                                                                       | Example Usage                         | Output               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | -------------------- |
| `%d`      | **Integer**. Prints an integer value (decimal).                                                                                                   | `System.out.printf("%d", 42);`        | `42`                 |
| `%f`      | **Floating-point** (decimal). Prints floating-point numbers (e.g., `float`, `double`). Defaults to six decimal places unless specified otherwise. | `System.out.printf("%.2f", 3.14159);` | `3.14`               |
| `%s`      | **String**. Prints a string of characters.                                                                                                        | `System.out.printf("%s", "Hello");`   | `Hello`              |
| `%c`      | **Character**. Prints a single character.                                                                                                         | `System.out.printf("%c", 'A');`       | `A`                  |
| `%n`      | **New line**. Inserts a line break (platform-independent newline). Equivalent to `\n`.                                                            | `System.out.printf("Hello%nWorld");`  | `Hello` <br> `World` |
| `%x`      | **Hexadecimal integer**. Prints an integer as a hexadecimal (base-16) value.                                                                      | `System.out.printf("%x", 255);`       | `ff`                 |
| `%o`      | **Octal integer**. Prints an integer as an octal (base-8) value.                                                                                  | `System.out.printf("%o", 8);`         | `10`                 |
| `%e`      | **Scientific notation**. Prints a floating-point number in scientific notation.                                                                   | `System.out.printf("%e", 1234.56);`   | `1.234560e+03`       |
| `%g`      | **General floating-point**. Uses `%f` or `%e` depending on the value and precision.                                                               | `System.out.printf("%g", 1234.56);`   | `1234.56`            |
| `%b`      | **Boolean**. Prints `true` or `false`.                                                                                                            | `System.out.printf("%b", 5 > 1);`     | `true`               |
| `%h`      | **Hash code**. Prints the hash code of the argument in hexadecimal form.                                                                          | `System.out.printf("%h", "test");`    | `94c9b` (or similar) |

### Advanced Specifiers with Formatting Options

1. **Width and Precision**: Specify minimum width and precision for numbers. Useful for aligning output or controlling decimal places.

   - `%.2f` → Limits floating-point to 2 decimal places.
   - `%10d` → Sets width of 10 for integer, right-aligned.
   - `%10.2f` → Sets width of 10 for float with 2 decimal places, right-aligned.

   ```java
   System.out.printf("Float: %10.2f", 3.14159); // Output: "     3.14"
   ```

2. **Left Alignment with `-`**: Left-aligns the value within the specified width.

   - `%-10d` → Left-aligns integer within a width of 10.

   ```java
   System.out.printf("Left: %-10dEnd", 42); // Output: "Left: 42        End"
   ```

3. **Leading Zeros**: Pad numbers with zeros by adding `0` before the width.

   - `%05d` → Pads an integer to 5 digits with leading zeros.

   ```java
   System.out.printf("Padded: %05d", 42); // Output: "Padded: 00042"
   ```

4. **Positive/Negative Sign**: Add `+` to show positive sign for numbers.

   - `%+d` → Displays `+` before positive integers.

   ```java
   System.out.printf("Signed: %+d", 42); // Output: "Signed: +42"
   ```

### Example Usage in Java

```java
public class Main {
    public static void main(String[] args) {
        int age = 30;
        double height = 5.75;
        String name = "Alice";

        System.out.printf("Name: %s, Age: %d, Height: %.2f feet%n", name, age, height);
        // Output: "Name: Alice, Age: 30, Height: 5.75 feet"

        System.out.printf("Hex: %x, Octal: %o%n", 255, 255);
        // Output: "Hex: ff, Octal: 377"

        System.out.printf("Scientific: %e%n", 1234.56);
        // Output: "Scientific: 1.234560e+03"

        System.out.printf("Boolean: %b%n", age > 20);
        // Output: "Boolean: true"

        System.out.printf("Left-aligned: %-10s End%n", name);
        // Output: "Left-aligned: Alice      End"
    }
}
```

These format specifiers and options make `printf` very flexible for formatting output in Java, allowing you to control the presentation of integers, floating-point numbers, text, and more.
