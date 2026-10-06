# TanTitan2010 Java Workspace

This is a normal Maven Java project and opens directly in Apache NetBeans on Windows.

- JDK: 17+
- Build: `mvn clean compile`
- Run: `mvn exec:java`
- Or use NetBeans Run Project / Debug Project.

The sample uses the real package `com.tantitan2010.demo`. The Command Center browser IDE uses the same local `javac`/`java` toolchain when launched with `start-command-center.bat`; the bridge compiles all supplied source files together, preserving package paths.
