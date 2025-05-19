pragma circom 2.0.0;

template ScoreVerification() {
    // Input signals
    signal input score;
    signal input threshold;

    // Output signal (1 if score >= threshold, 0 otherwise)
    signal output out;

    // Constraint: score must be >= threshold
    component isGreaterThan = GreaterThan(32);
    isGreaterThan.in[0] <== score;
    isGreaterThan.in[1] <== threshold;
    out <== isGreaterThan.out;
}

// Helper template to check if a number is greater than another
template GreaterThan(n) {
    signal input in[2];
    signal output out;

    signal diff[n];
    signal diffInv[n];

    // Calculate difference
    diff[0] <== in[0] - in[1];

    // Calculate inverse of difference
    diffInv[0] <== 1 / diff[0];

    // Constraint: if diff >= 0, then diff * diffInv = 1
    diff[0] * diffInv[0] === 1;

    // Output 1 if diff >= 0, 0 otherwise
    out <== diff[0] * diffInv[0];
}

component main = ScoreVerification();
