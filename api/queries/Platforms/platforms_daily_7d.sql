SELECT
    date_trunc('day', block_timestamp) AS date,
    platform,
    COUNT(DISTINCT tx_hash) AS swaps,
    COUNT(DISTINCT origin_from_address) AS users,
    SUM(amount_in_usd) AS volume
FROM
    avalanche.defi.ez_dex_swaps
WHERE
    date BETWEEN DATEADD('day', -8, GETDATE())
    AND DATEADD('day', -1, GETDATE())
GROUP BY
    date,
    platform
ORDER BY
    date ASC