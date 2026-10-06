package com.tantitan2010.demo;

public final class Greeter {
    private Greeter() {}

    public static String message(String name) {
        return "Hello, " + name + " from a real Java package.";
    }
}
