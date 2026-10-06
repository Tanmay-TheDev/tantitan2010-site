# Real Java runtime

## Command Center IDE / Terminal

For **real Java**, open Windows with `start-command-center.bat`. It starts a localhost Java bridge and the browser IDE then uses the machine's actual `javac` and `java` executables.

- Compile = real `javac`
- Run = real `java`
- `System.in` / Scanner input is passed to the real process
- Multiple `.java` files in the IDE are compiled together
- Packages are supported
- Standard JDK classes are available
- A 15-second process limit prevents a runaway program from locking the workspace

If the launcher is not used, the browser can fall back to CheerpJ/OpenJDK or the embedded offline subset depending on the environment. CheerpJ is a browser JVM and does not replace the native Windows JDK.

## NetBeans

Open `netbeans-java-project/pom.xml` in Apache NetBeans. It is a normal Maven Java project targeting JDK 17+ and uses the normal NetBeans Run/Debug/Compile workflow.

## Windows requirement

Install a JDK 17+ and make sure both `java` and `javac` are on PATH. The launcher checks this before starting the bridge.
