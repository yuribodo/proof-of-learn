pragma circom 2.0.0;

// Custom IsZero template to check if a value is zero
template IsZero() {
    signal input in;
    signal output out;

    signal inv;
    inv <-- in != 0 ? 1 / in : 0;
    out <-- in == 0 ? 1 : 0;

    // Constraint: in * out = 0
    in * out === 0;
    // Constraint: (1 - out) * (in * inv - 1) = 0
    (1 - out) * (in * inv - 1) === 0;
}

// Custom LessThan template for comparison
template LessThan(n) {
    assert(n <= 252);
    signal input in[2];
    signal output out;

    var pow2n = 1;
    for (var i = 0; i < n; i++) {
        pow2n = pow2n * 2;
    }

    signal diff;
    diff <-- (in[1] - in[0] + pow2n) % pow2n;

    out <-- (diff < pow2n \ 2) ? 1 : 0;

    out * (out - 1) === 0;

    signal diff_check;
    diff_check <-- out ? in[1] - in[0] : in[0] - in[1] + 1;

    signal diff_check_inv;
    diff_check_inv <-- 1 / diff_check;
    diff_check * diff_check_inv === 1;
}

// Custom GreaterEqThan template for comparison
template GreaterEqThan(n) {
    signal input in[2];
    signal output out;

    component lt = LessThan(n);
    lt.in[0] <== in[1];
    lt.in[1] <== in[0];

    out <== lt.out;
}

template QuizScore() {
    signal input totalCorrect;
    signal input totalQuestions;
    signal output passed;

    // Calculate score as a percentage using multiplication by inverse instead of division
    signal score;
    signal numerator;
    signal invDenominator;

    // Compute numerator
    numerator <== totalCorrect * 100;

    // Compute the multiplicative inverse of the denominator
    invDenominator <-- totalQuestions != 0 ? 1 / totalQuestions : 0;

    // Check that invDenominator * totalQuestions = 1 (or 0 if totalQuestions = 0)
    component isZero = IsZero();
    isZero.in <== totalQuestions;
    (1 - isZero.out) * (invDenominator * totalQuestions - 1) === 0;

    // Compute score as (totalCorrect * 100) / totalQuestions
    score <== numerator * invDenominator;

    // Check if score is at least 90%
    component isPassingScore = GreaterEqThan(10);
    isPassingScore.in[0] <== score;
    isPassingScore.in[1] <== 90;

    // Set output
    passed <== isPassingScore.out;

    // Assert that the student passed
    passed === 1;
}

component main = QuizScore();

