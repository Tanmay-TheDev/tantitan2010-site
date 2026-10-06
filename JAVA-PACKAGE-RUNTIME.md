# Java Runtime / NetBeans Accuracy Notes

The Windows page (`Win 11.html`) contains the NetBeans-style workbench and the Terminal. When this package is started with `start-command-center.bat`, both use the bundled local Java bridge and the host JDK.

## Real Java path

- `javac` and `java` are executed from the installed JDK on Windows.
- The bridge accepts multiple `fileName` + `fileContent` pairs in one request.
- Java package paths are preserved, for example `com/example/Main.java`.
- `mainClass` may be fully qualified, for example `com.example.Main`.
- Standard JDK imports such as `java.util.*` and `java.io.*` are handled by the host JDK.
- Compiler diagnostics are returned directly from `javac`, including source path and caret locations.
- `Scanner(System.in)` / other standard input is passed to the real `java` process by the NetBeans Run Configuration.
- Swing GUI forms use the same compiled classes and are launched by the native host JVM.

## Browser-only fallback

Opening `index.html` or `Win 11.html` directly with `file://` cannot start the host JDK. In that case the existing browser fallback remains available, but it is intentionally limited and does not pretend to be a full desktop Java installation.

## NetBeans sample

`netbeans-java-project/` is a normal Maven project. The sample main class is:

`com.tantitan2010.demo.Main`

It imports `com.tantitan2010.demo.Greeter` and `java.util.Scanner`, so package resolution is exercised by the sample itself.
