WITH tx AS (
    SELECT
        *
    FROM
        avalanche.defi.ez_dex_swaps
    WHERE
        amount_in_usd IS NOT NULL
        AND block_timestamp BETWEEN DATEADD('day', -8, GETDATE())
        AND DATEADD('day', -1, GETDATE())
),
top10 AS (
    SELECT
        tx.pool_name AS pool,
        COUNT(DISTINCT tx.tx_hash) AS swaps,
        SUM(tx.amount_in_usd) AS volume
    FROM
        tx
    GROUP BY
        pool
    ORDER BY
        volume DESC
    LIMIT
        10
)
SELECT
    date_trunc('day', t.block_timestamp) AS date,
    t.pool_name AS pool,
    COUNT(DISTINCT t.tx_hash) AS swaps,
    COUNT(DISTINCT t.origin_from_address) AS users,
    SUM(t.amount_in_usd) AS volume
FROM
    tx t
    JOIN top10 ON t.pool_name = top10.pool
GROUP BY
    date,
    t.pool_name
ORDER BY
    date ASC,
    pool ASC