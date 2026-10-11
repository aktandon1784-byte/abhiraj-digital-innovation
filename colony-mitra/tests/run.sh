#!/bin/bash
# Usage: run.sh <psql connection args...>   e.g. run.sh -h /tmp/cmpg -p 5544 -U postgres
# Creates a fresh database, loads the old (v1) schema if given via OLD_SCHEMA, then schema.sql, then the tests.
set -e
D=$(cd "$(dirname "$0")" && pwd)
P="psql -X -q -o /dev/null -v ON_ERROR_STOP=1 $*"
$P -d postgres -c "drop database if exists cm_test" -c "create database cm_test"
$P -d cm_test -f "$D/supabase-stub.sql"
if [ -n "$OLD_SCHEMA" ]; then $P -d cm_test -f "$OLD_SCHEMA"; fi
$P -d cm_test -f "$D/../supabase/schema.sql"
$P -d cm_test -f "$D/../supabase/schema.sql"   # second run: must be idempotent
psql -X -q -v ON_ERROR_STOP=1 $* -d cm_test -tA -f "$D/rls-test.sql" | grep -E '^(PASS|FAIL)'
