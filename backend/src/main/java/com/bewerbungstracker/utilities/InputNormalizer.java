package com.bewerbungstracker.utilities;

public final class InputNormalizer {

    private InputNormalizer() {
    }

    public static String normalize(String s) {
        return (s == null || s.isBlank()) ? null : s;
    }

    public static Integer normalize(Integer i) {
        return i;
    }
}