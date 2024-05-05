SELECT
    COUNT(DISTINCT tx_hash) AS swaps,
    COUNT(DISTINCT origin_from_address) AS users,
    SUM(amount_in_usd) AS volume
FROM
    avalanche.defi.ez_dex_swaps
WHERE
    block_timestamp >= DATEADD('day', -1, GETDATE ())