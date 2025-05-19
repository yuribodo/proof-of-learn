#!/bin/bash

# Download the powers of tau file
echo "Downloading powers of tau file..."
wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_12.ptau -O backend/api/zk/pot12_final.ptau

echo "Done! Powers of tau file downloaded to backend/api/zk/pot12_final.ptau"
