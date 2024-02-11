EXIT_CODE=0
PORT=3301

function free_port() {
	echo "[run-e2e-local]: killing processes on port $PORT"
	lsof -ti :$PORT | xargs kill -9
}

free_port

echo "[run-e2e-local]: running dev server"
npm run dev -- --port=$PORT &

sleep 3

echo "[run-e2e-local]: running e2e tests"
npm run test:e2e || EXIT_CODE=$?

free_port

exit $EXIT_CODE