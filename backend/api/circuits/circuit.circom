pragma circom 2.1.6;

template ScoreVerifier() {
    // Input signals
    signal input totalCorrect;
    signal input totalQuestions;

    // Output signal
    signal output isValid;

    // Calculate percentage
    signal score <== (totalCorrect * 100) / totalQuestions;

    // Check if score is >= 90
    component isGreaterThan = GreaterThan(90);
    isGreaterThan.in[0] <== score;
    isGreaterThan.in[1] <== 90;

    isValid <== isGreaterThan.out;
}

// Helper template to check if a number is greater than another
template GreaterThan(n) {
    signal input in[2];
    signal output out;

    signal temp;
    temp <== in[0] - in[1];
    out <== temp > 0 ? 1 : 0;
}

component main = ScoreVerifier();
