platform_recent_tx = """
SELECT
  block_timestamp AS date,
  platform,
  pool_name,
  contract_address,
  tx_hash,
  symbol_in,
  token_in,
  amount_in,
  symbol_out,
  token_out,
  amount_out
FROM avalanche.core.ez_dex_swaps
WHERE date >= DATEADD('day', -1, GETDATE())
AND platform = '{}'
ORDER BY date DESC
LIMIT 1000;
"""


top_platforms = """
SELECT
  platform,
  COUNT(DISTINCT tx_hash) AS tx_count,
  COUNT(DISTINCT origin_from_address) AS users,
  SUM(amount_in_usd) AS usd
FROM
  avalanche.core.ez_dex_swaps
WHERE
  block_timestamp >= DATEADD('day', -{}, GETDATE ())
GROUP BY
  platform
"""


general_recent_transactions = """
SELECT
  block_timestamp AS date,
  platform,
  pool_name,
  contract_address,
  token_in,
  symbol_in,
  SUM(amount_in) AS amount_in,
  token_out,
  symbol_out,
  SUM(amount_out) AS amount_out,
  origin_from_address AS user,
  tx_hash
FROM
  avalanche.core.ez_dex_swaps
WHERE
  date >= DATEADD('day', -1, GETDATE ())
GROUP BY
  date, platform, pool_name, contract_address, token_in, symbol_in, token_out, symbol_out, user, tx_hash
ORDER BY
  date DESC
LIMIT
  200
"""
