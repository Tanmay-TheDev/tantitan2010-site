command-center-bridge.jar
-------------------------
Local HTTP bridge used by the Windows/NetBeans workbench.
It exposes:
  GET  /api/netbeans/status
  POST /api/netbeans/execute
  POST /api/netbeans/gui/stop
and backward-compatible /api/java/* aliases.

The JAR must be run with a JDK (not a JRE), because it invokes javac and java from the host PATH.
