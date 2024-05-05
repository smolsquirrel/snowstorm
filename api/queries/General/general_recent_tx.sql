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
    avalanche.defi.ez_dex_swaps
WHERE
    date >= DATEADD('day', -1, GETDATE ())
GROUP BY
    date,
    platform,
    pool_name,
    contract_address,
    token_in,
    symbol_in,
    token_out,
    symbol_out,
    user,
    tx_hash
ORDER BY
    date DESC
LIMIT
    200