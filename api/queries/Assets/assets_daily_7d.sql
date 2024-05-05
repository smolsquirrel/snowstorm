WITH tx AS (
    SELECT
        *
    FROM
        avalanche.defi.ez_dex_swaps
    WHERE
        amount_out_usd IS NOT NULL
        AND block_timestamp BETWEEN DATEADD('day', -8, GETDATE())
        AND DATEADD('day', -1, GETDATE())
),
top10 AS (
    SELECT
        tx.symbol_out AS asset,
        COUNT(DISTINCT tx.tx_hash) AS swaps,
        SUM(tx.amount_out_usd) AS volume
    FROM
        tx
    GROUP BY
        asset
    ORDER BY
        volume DESC
    LIMIT
        10
)
SELECT
    date_trunc('day', t.block_timestamp) AS date,
    t.symbol_out AS asset,
    COUNT(DISTINCT t.tx_hash) AS swaps,
    COUNT(DISTINCT t.origin_from_address) AS users,
    SUM(t.amount_out_usd) AS volume
FROM
    tx t
    JOIN top10 ON t.symbol_out = top10.asset
GROUP BY
    date,
    t.symbol_out
ORDER BY
    date ASC,
    asset ASC