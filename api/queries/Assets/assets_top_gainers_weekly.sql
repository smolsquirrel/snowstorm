WITH tx AS (
    SELECT
        date_trunc('day', block_timestamp) AS date,
        platform,
        symbol_out AS asset,
        amount_out_usd AS volume
    FROM
        avalanche.defi.ez_dex_swaps
    WHERE
        volume IS NOT NULL
        AND date BETWEEN DATEADD('day', -16, GETDATE ())
        AND DATEADD('day', -1, GETDATE ())
),
top10 AS (
    SELECT
        tx.asset AS asset,
        SUM(tx.volume) AS volume
    FROM
        tx
    WHERE
        tx.date BETWEEN DATEADD('day', -8, GETDATE ())
        AND DATEADD('day', -1, GETDATE ())
    GROUP BY
        asset
    ORDER BY
        volume DESC
    LIMIT
        10
), w1 AS (
    SELECT
        tx.platform AS platform,
        tx.asset AS asset,
        SUM(tx.volume) AS volume
    FROM
        tx
    WHERE
        tx.date BETWEEN DATEADD('day', -16, GETDATE ())
        AND DATEADD('day', -9, GETDATE ())
    GROUP BY
        asset,
        platform
),
w2 AS (
    SELECT
        tx.platform AS platform,
        tx.asset AS asset,
        SUM(tx.volume) AS volume
    FROM
        tx
    WHERE
        tx.date BETWEEN DATEADD('day', -8, GETDATE ())
        AND DATEADD('day', -1, GETDATE ())
    GROUP BY
        asset,
        platform
)
SELECT
    w1.asset,
    w1.platform,
    w1.volume as v1,
    w2.volume as v2,
    CASE
        WHEN v1 = 0 then 0
        else (v2 - v1) / v1
    END as change
FROM
    w1
    JOIN w2 ON w1.asset = w2.asset
    AND w1.platform = w2.platform
    JOIN top10 ON w1.asset = top10.asset
ORDER BY
    platform ASC,
    asset ASC