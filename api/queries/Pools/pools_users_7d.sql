WITH tx AS (
    SELECT
        *
    FROM
        avalanche.defi.ez_dex_swaps
    WHERE
        block_timestamp >= DATEADD('day', -7, GETDATE ())
        AND amount_in_usd IS NOT NULL
),
top10 AS (
    SELECT
        tx.pool_name AS pool,
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
    t.pool_name AS pool,
    t.origin_from_address AS user
FROM
    avalanche.defi.ez_dex_swaps t
    JOIN top10 ON t.pool_name = top10.pool
WHERE
    t.block_timestamp >= DATEADD('day', -7, GETDATE ())