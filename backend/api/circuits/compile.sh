#!/bin/bash

# Install circom if not already installed
if ! command -v circom &> /dev/null; then
    echo "Installing circom..."
    curl -Ls https://scrypt.io/scripts/install-circom.sh | sh
fi

# Create the zk directory if it doesn't exist
mkdir -p backend/api/zk

# Compile the circuit
echo "Compiling circuit..."
circom backend/api/zk/circuit.circom --r1cs --wasm --sym -o backend/api/zk

# Generate the proving key
echo "Generating proving key..."
snarkjs groth16 setup backend/api/zk/circuit.r1cs backend/api/zk/pot12_final.ptau backend/api/zk/circuit_final.zkey

# Export the verification key
echo "Exporting verification key..."
snarkjs zkey export verificationkey backend/api/zk/circuit_final.zkey backend/api/zk/verification_key.json

echo "Done! Files generated in backend/api/zk/"
