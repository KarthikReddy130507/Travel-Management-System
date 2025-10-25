package com.example.travelbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/auth")
public class AuthController {

    // in-memory store for demo purposes
    private final Map<String, String> users = new ConcurrentHashMap<>();

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String name = body.getOrDefault("name", "");
        if (email == null || password == null) return ResponseEntity.badRequest().body("Missing fields");
        if (users.containsKey(email)) return ResponseEntity.status(409).body("User exists");
        users.put(email, password);
        return ResponseEntity.ok(Map.of("message", "signed up"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        if (email == null || password == null) return ResponseEntity.badRequest().body("Missing fields");
        String pw = users.get(email);
        if (pw == null || !pw.equals(password)) return ResponseEntity.status(401).body("Invalid credentials");
        return ResponseEntity.ok(Map.of("token", "demo-token-for-" + email));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard() {
        return ResponseEntity.ok(Map.of("destinations", new String[]{"Paris","Bali","New York"}, "bookings", 3, "payments", "ok"));
    }
}
