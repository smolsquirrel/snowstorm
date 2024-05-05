WITH tx AS (
    SELECT
        date_trunc('day', block_timestamp) AS date,
        platform,
        pool_name AS pool,
        amount_in_usd AS volume
    FROM
        avalanche.defi.ez_dex_swaps
    WHERE
        volume IS NOT NULL
        AND date BETWEEN DATEADD('day', -16, GETDATE ())
        AND DATEADD('day', -1, GETDATE ())
),
top10 AS (
    SELECT
        tx.pool AS pool,
        SUM(tx.volume) AS volume
    FROM
        tx
    WHERE
        tx.date BETWEEN DATEADD('day', -8, GETDATE ())
        AND DATEADD('day', -1, GETDATE ())
    GROUP BY
        pool
    ORDER BY
        volume DESC
    LIMIT
        10
), w1 AS (
    SELECT
        tx.platform AS platform,
        tx.pool AS pool,
        SUM(tx.volume) AS volume
    FROM
        tx
    WHERE
        tx.date BETWEEN DATEADD('day', -16, GETDATE ())
        AND DATEADD('day', -9, GETDATE ())
    GROUP BY
        pool,
        platform
),
w2 AS (
    SELECT
        tx.platform AS platform,
        tx.pool AS pool,
        SUM(tx.volume) AS volume
    FROM
        tx
    WHERE
        tx.date BETWEEN DATEADD('day', -8, GETDATE ())
        AND DATEADD('day', -1, GETDATE ())
    GROUP BY
        pool,
        platform
)
SELECT
    w1.pool,
    w1.platform,
    w1.volume as v1,
    w2.volume as v2,
    CASE
        WHEN v1 = 0 then 0
        else (v2 - v1) / v1
    END as change
FROM
    w1
    JOIN w2 ON w1.pool = w2.pool
    AND w1.platform = w2.platform
    JOIN top10 ON w1.pool = top10.pool
ORDER BY
    platform ASC,
    pool ASC