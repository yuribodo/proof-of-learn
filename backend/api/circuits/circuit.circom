pragma circom 2.0.0;

template IsZero() {
    signal input in;
    signal output out;

    out <-- in == 0 ? 1 : 0;
    signal inv <-- in != 0 ? 1/in : 0;

    out * (1 - out) === 0;   // Binary check
    in * inv === 1 - out;    // Quadratic inverse constraint
    in * out === 0;          // Zero enforcement
}

template LessThan(n) {
    assert(n <= 252);
    signal input in[2];
    signal output out;

    var pow2n = 1 << n;
    signal diff <-- (in[1] - in[0] + pow2n) % pow2n;

    out <-- (diff < (pow2n >> 1)) ? 1 : 0;
    out * (out - 1) === 0;

    signal diff_check <-- out ? in[1] - in[0] : in[0] - in[1] + 1;
    component diff_check_inv = IsZero();
    diff_check_inv.in <== diff_check;
    diff_check_inv.out === 0;
}

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

    // Ensure valid inputs
    component checkQuestions = IsZero();
    checkQuestions.in <== totalQuestions;
    checkQuestions.out === 0;

    component checkCorrect = LessThan(32);
    checkCorrect.in[0] <== totalCorrect;
    checkCorrect.in[1] <== totalQuestions + 1;
    checkCorrect.out === 1;

    // SAFE SCORE CALCULATION
    signal denominator;
    denominator <== totalQuestions;

    signal invDenominator;
    invDenominator <-- 1/denominator;

    // Explicit quadratic constraints
    denominator * invDenominator === 1;
    signal score <== totalCorrect * 100 * invDenominator;

    // Passing check
    component checkPassing = GreaterEqThan(10);
    checkPassing.in[0] <== score;
    checkPassing.in[1] <== 90;

    passed <== checkPassing.out;
    passed === 1;
}

component main = QuizScore();
