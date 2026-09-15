import assert from "node:assert/strict";
import test from "node:test";
import { loadEnvironment } from "./env";

test("loads safe local defaults", () => {
  const environment = loadEnvironment({});
  assert.equal(environment.PORT, 3000);
  assert.equal(environment.BLOCKCHAIN_CHAIN_ID, 31337);
});

test("rejects an invalid contract address", () => {
  assert.throws(() => loadEnvironment({ CERTIFICATE_CONTRACT_ADDRESS: "not-an-address" }));
});
