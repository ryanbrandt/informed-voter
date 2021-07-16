  
#!/bin/bash

cd ./src/utils

echo export const FEC_BASE_URL = "\"${FEC_BASE_URL}\";" export const FEC_API_KEY = "\"${FEC_API_KEY}\";" > secret.ts